from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid


class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    message: str = Field(..., min_length=1, max_length=1000)


class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    message: str
    status: str = "new"  # new, read, responded
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
