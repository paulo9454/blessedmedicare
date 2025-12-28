#!/usr/bin/env python3
"""
Backend API Testing for Blessed Medicare Centre Contact Form
Tests all contact form endpoints with comprehensive validation
"""

import requests
import json
import os
from datetime import datetime
import sys

# Load environment variables
def load_env_vars():
    """Load environment variables from frontend/.env"""
    env_path = "/app/frontend/.env"
    env_vars = {}
    try:
        with open(env_path, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env_vars[key] = value.strip('"')
        return env_vars
    except Exception as e:
        print(f"Error loading environment variables: {e}")
        return {}

# Get backend URL
env_vars = load_env_vars()
BACKEND_URL = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE}")

class ContactFormTester:
    def __init__(self):
        self.test_results = []
        self.created_inquiry_id = None
        
    def log_result(self, test_name, success, message, details=None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            'test': test_name,
            'status': status,
            'message': message,
            'details': details
        }
        self.test_results.append(result)
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_create_contact_valid(self):
        """Test POST /api/contact with valid data"""
        test_name = "Create Contact Inquiry - Valid Data"
        
        valid_data = {
            "name": "John Doe",
            "email": "john.doe@example.com", 
            "phone": "0721123456",
            "message": "I would like to book an appointment for a general consultation."
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=valid_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Verify required fields
                required_fields = ['id', 'name', 'email', 'phone', 'message', 'status', 'created_at']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_result(test_name, False, f"Missing fields: {missing_fields}", data)
                    return
                
                # Verify field values
                if (data['name'] == valid_data['name'] and 
                    data['email'] == valid_data['email'] and
                    data['phone'] == valid_data['phone'] and
                    data['message'] == valid_data['message'] and
                    data['status'] == 'new'):
                    
                    self.created_inquiry_id = data['id']
                    self.log_result(test_name, True, "Contact inquiry created successfully", 
                                  f"ID: {data['id']}, Status: {data['status']}")
                else:
                    self.log_result(test_name, False, "Data mismatch in response", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
    
    def test_create_contact_missing_name(self):
        """Test POST /api/contact with missing name"""
        test_name = "Create Contact Inquiry - Missing Name"
        
        invalid_data = {
            "email": "test@example.com",
            "phone": "0721123456", 
            "message": "Test message"
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=invalid_data, timeout=10)
            
            if response.status_code == 422:
                self.log_result(test_name, True, "Validation error returned correctly")
            else:
                self.log_result(test_name, False, f"Expected 422, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
    
    def test_create_contact_invalid_email(self):
        """Test POST /api/contact with invalid email format"""
        test_name = "Create Contact Inquiry - Invalid Email"
        
        invalid_data = {
            "name": "Test User",
            "email": "invalid-email-format",
            "phone": "0721123456",
            "message": "Test message"
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=invalid_data, timeout=10)
            
            if response.status_code == 422:
                self.log_result(test_name, True, "Validation error returned correctly")
            else:
                self.log_result(test_name, False, f"Expected 422, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
    
    def test_create_contact_empty_message(self):
        """Test POST /api/contact with empty message"""
        test_name = "Create Contact Inquiry - Empty Message"
        
        invalid_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "0721123456",
            "message": ""
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=invalid_data, timeout=10)
            
            if response.status_code == 422:
                self.log_result(test_name, True, "Validation error returned correctly")
            else:
                self.log_result(test_name, False, f"Expected 422, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
    
    def test_get_all_contacts(self):
        """Test GET /api/contact - Retrieve all contact inquiries"""
        test_name = "Get All Contact Inquiries"
        
        try:
            response = requests.get(f"{API_BASE}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    # Check if our created inquiry is in the list
                    if self.created_inquiry_id:
                        found_inquiry = any(inquiry.get('id') == self.created_inquiry_id for inquiry in data)
                        if found_inquiry:
                            self.log_result(test_name, True, f"Retrieved {len(data)} inquiries, including our test inquiry")
                        else:
                            self.log_result(test_name, False, f"Our test inquiry {self.created_inquiry_id} not found in results")
                    else:
                        self.log_result(test_name, True, f"Retrieved {len(data)} inquiries")
                else:
                    self.log_result(test_name, False, "Response is not an array", data)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
    
    def test_get_specific_contact(self):
        """Test GET /api/contact/{id} - Retrieve specific inquiry"""
        test_name = "Get Specific Contact Inquiry"
        
        if not self.created_inquiry_id:
            self.log_result(test_name, False, "No inquiry ID available from previous test")
            return
        
        try:
            response = requests.get(f"{API_BASE}/contact/{self.created_inquiry_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Verify it's the correct inquiry
                if data.get('id') == self.created_inquiry_id:
                    required_fields = ['id', 'name', 'email', 'phone', 'message', 'status', 'created_at']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if missing_fields:
                        self.log_result(test_name, False, f"Missing fields: {missing_fields}", data)
                    else:
                        self.log_result(test_name, True, "Retrieved specific inquiry with all required fields")
                else:
                    self.log_result(test_name, False, f"ID mismatch: expected {self.created_inquiry_id}, got {data.get('id')}")
            elif response.status_code == 404:
                self.log_result(test_name, False, "Inquiry not found (404)", response.text)
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
    
    def test_get_nonexistent_contact(self):
        """Test GET /api/contact/{id} with non-existent ID"""
        test_name = "Get Non-existent Contact Inquiry"
        
        fake_id = "non-existent-id-12345"
        
        try:
            response = requests.get(f"{API_BASE}/contact/{fake_id}", timeout=10)
            
            if response.status_code == 404:
                self.log_result(test_name, True, "404 returned correctly for non-existent inquiry")
            else:
                self.log_result(test_name, False, f"Expected 404, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_result(test_name, False, f"Request failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all contact form API tests"""
        print("=" * 60)
        print("BLESSED MEDICARE CENTRE - CONTACT FORM API TESTS")
        print("=" * 60)
        
        # Test sequence
        self.test_create_contact_valid()
        self.test_create_contact_missing_name()
        self.test_create_contact_invalid_email()
        self.test_create_contact_empty_message()
        self.test_get_all_contacts()
        self.test_get_specific_contact()
        self.test_get_nonexistent_contact()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if "✅ PASS" in result['status'])
        failed = sum(1 for result in self.test_results if "❌ FAIL" in result['status'])
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        
        if failed > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if "❌ FAIL" in result['status']:
                    print(f"  - {result['test']}: {result['message']}")
        
        return failed == 0

if __name__ == "__main__":
    tester = ContactFormTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)