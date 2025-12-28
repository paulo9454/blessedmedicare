# Blessed Medicare Centre - Backend Integration Contracts

## Contact Form Integration

### Frontend Mock Data
Currently in Contact.jsx:
- Form submission shows success message but doesn't save to database
- Uses local state management only

### Backend Implementation

#### 1. MongoDB Model: ContactInquiry
```python
class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    message: str
    status: str = "new"  # new, read, responded
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

#### 2. API Endpoints

**POST /api/contact**
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0721123456",
    "message": "I need an appointment"
  }
  ```
- Response (Success):
  ```json
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0721123456",
    "message": "I need an appointment",
    "status": "new",
    "created_at": "2025-12-28T17:35:00"
  }
  ```
- Response (Error):
  ```json
  {
    "detail": "Error message"
  }
  ```

**GET /api/contact**
- Returns all contact inquiries (for admin use)
- Response:
  ```json
  [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "0721123456",
      "message": "I need an appointment",
      "status": "new",
      "created_at": "2025-12-28T17:35:00"
    }
  ]
  ```

**GET /api/contact/{id}**
- Returns specific inquiry by ID

### Frontend-Backend Integration

#### Contact.jsx Changes
1. Import axios and backend URL
2. Update handleSubmit to call POST /api/contact
3. Handle success/error responses
4. Show appropriate user feedback

#### Integration Flow
1. User fills contact form
2. Frontend validates required fields
3. Frontend sends POST request to /api/contact
4. Backend validates data
5. Backend saves to MongoDB
6. Backend returns success response
7. Frontend shows success message
8. Form is reset

### Error Handling
- Network errors: Show "Unable to send message. Please try again."
- Validation errors: Show specific field errors
- Server errors: Show generic error message with retry option

### Security Considerations
- Email validation on backend
- Phone number format validation
- Message length limits (max 1000 characters)
- Rate limiting (future enhancement)

### Testing Checklist
- [ ] Submit valid contact form
- [ ] Verify data saved in MongoDB
- [ ] Check success message displays
- [ ] Test empty fields validation
- [ ] Test invalid email format
- [ ] Test backend error handling
- [ ] Verify form resets after submission
