from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from models import ContactInquiry, ContactInquiryCreate


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Blessed Medicare Centre API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(inquiry: ContactInquiryCreate):
    """
    Create a new contact inquiry from the website contact form
    """
    try:
        # Create ContactInquiry object with additional fields
        inquiry_dict = inquiry.model_dump()
        inquiry_obj = ContactInquiry(**inquiry_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = inquiry_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into MongoDB
        result = await db.contact_inquiries.insert_one(doc)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to save inquiry")
        
        logger.info(f"New contact inquiry saved: {inquiry_obj.id} from {inquiry_obj.name}")
        return inquiry_obj
    except Exception as e:
        logger.error(f"Error saving contact inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save inquiry. Please try again.")

@api_router.get("/contact", response_model=List[ContactInquiry])
async def get_contact_inquiries():
    """
    Get all contact inquiries (for admin use)
    """
    try:
        # Exclude MongoDB's _id field from the query results
        inquiries = await db.contact_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for inquiry in inquiries:
            if isinstance(inquiry['created_at'], str):
                inquiry['created_at'] = datetime.fromisoformat(inquiry['created_at'])
        
        return inquiries
    except Exception as e:
        logger.error(f"Error fetching contact inquiries: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch inquiries")

@api_router.get("/contact/{inquiry_id}", response_model=ContactInquiry)
async def get_contact_inquiry(inquiry_id: str):
    """
    Get a specific contact inquiry by ID
    """
    try:
        inquiry = await db.contact_inquiries.find_one({"id": inquiry_id}, {"_id": 0})
        if not inquiry:
            raise HTTPException(status_code=404, detail="Inquiry not found")
        
        # Convert ISO string timestamp back to datetime object
        if isinstance(inquiry['created_at'], str):
            inquiry['created_at'] = datetime.fromisoformat(inquiry['created_at'])
        
        return ContactInquiry(**inquiry)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact inquiry {inquiry_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch inquiry")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()