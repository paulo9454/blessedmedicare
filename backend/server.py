from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from models import ContactInquiry, ContactInquiryCreate
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend API Configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
BUSINESS_EMAIL = os.environ.get('BUSINESS_EMAIL', 'info@blessedmedicare.co.ke')

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection with error handling
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'blessed_medicare')

try:
    client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
    db = client[db_name]
    logger.info(f"MongoDB connection configured for: {db_name}")
except Exception as e:
    logger.error(f"MongoDB connection error: {str(e)}")
    # Continue startup even if MongoDB fails initially
    client = None
    db = None

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
    if not db:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
        
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if not db:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
        
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Contact Form Endpoints
async def send_contact_email(inquiry: ContactInquiry):
    """
    Send email notification when new contact inquiry is received
    """
    try:
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #8FEC78, #81DD67); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }}
                .header h1 {{ color: white; margin: 0; font-size: 24px; }}
                .content {{ background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }}
                .field {{ margin-bottom: 20px; }}
                .label {{ font-weight: bold; color: #003720; margin-bottom: 5px; }}
                .value {{ color: #0e0f0c; padding: 10px; background: #f5f5f5; border-radius: 4px; }}
                .footer {{ background: #f9f9f9; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🏥 New Contact Inquiry</h1>
                </div>
                <div class="content">
                    <p>You have received a new contact inquiry from the Blessed Medicare Centre website:</p>
                    
                    <div class="field">
                        <div class="label">Name:</div>
                        <div class="value">{inquiry.name}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Email:</div>
                        <div class="value">{inquiry.email}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Phone:</div>
                        <div class="value">{inquiry.phone}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Message:</div>
                        <div class="value">{inquiry.message}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Inquiry ID:</div>
                        <div class="value">{inquiry.id}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">Received:</div>
                        <div class="value">{inquiry.created_at.strftime('%B %d, %Y at %I:%M %p')}</div>
                    </div>
                </div>
                <div class="footer">
                    <p><strong>Blessed Medicare Centre</strong></p>
                    <p>Pipeline (kware), Kware stage mpya, Outer Ring Rd, Nairobi</p>
                    <p>Phone: 0721 480929 | Open 24 Hours</p>
                    <p style="margin-top: 15px; color: #999;">Designed & Managed by Mose Digital</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [BUSINESS_EMAIL],
            "subject": f"New Contact Inquiry from {inquiry.name}",
            "html": html_content
        }
        
        # Run sync SDK in thread to keep FastAPI non-blocking
        email_result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent for inquiry {inquiry.id}: {email_result.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email for inquiry {inquiry.id}: {str(e)}")
        # Don't fail the request if email fails - inquiry is already saved
        return False

@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(inquiry: ContactInquiryCreate):
    """
    Create a new contact inquiry from the website contact form
    Sends email notification to business email
    """
    if not db:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
        
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
        
        # Send email notification (non-blocking - don't wait for result)
        asyncio.create_task(send_contact_email(inquiry_obj))
        
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

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()