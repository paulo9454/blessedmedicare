# Custom Domain & Email Integration Setup Guide

## 🌐 Custom Domain Setup: blessedmedicare.co.ke

### Step 1: Deploy Your Application
Before connecting a custom domain, ensure your application is deployed on Emergent.

### Step 2: Link Domain in Emergent Dashboard

1. **Navigate to Domain Settings**
   - Log into your Emergent dashboard
   - Find your Blessed Medicare Centre project
   - Click on **"Link domain"** button

2. **Enter Your Domain**
   - Type: `blessedmedicare.co.ke`
   - Click **"Entri"** to start configuration

3. **Follow On-Screen Instructions**
   - The system will provide specific DNS records
   - Keep this page open for reference

### Step 3: Configure DNS Records

**IMPORTANT:** Before adding new records, **remove ALL existing 'A records'** from your DNS settings.

1. **Log into your domain registrar** (where you bought blessedmedicare.co.ke)
2. **Navigate to DNS Management**
3. **Remove all existing A records**
4. **Add the DNS records** shown in the Emergent "Entri" interface
5. **Save changes**

### Step 4: Wait for DNS Propagation

**Timeline:**
- **Typical**: 5-15 minutes
- **Maximum**: Up to 24 hours for global propagation

**Check Propagation:**
- Use online tools like: whatsmydns.net
- Enter: blessedmedicare.co.ke
- Select: A record
- Check if new records are visible globally

### Step 5: Verify SSL/HTTPS

✅ **Automatic SSL**: HTTPS is automatically enabled by Emergent
- No manual certificate configuration needed
- SSL certificate is provisioned automatically
- Your site will be accessible at: https://blessedmedicare.co.ke

### Step 6: Troubleshooting

**If site isn't live after 15 minutes:**
1. Double-check DNS records match exactly what Emergent provided
2. Ensure ALL old A records were removed
3. Try re-linking the domain:
   - Click "Entri" again in Emergent dashboard
   - Follow instructions once more
4. Clear your browser cache
5. Try accessing from incognito/private window

### ✅ What's Automatically Handled

- ✅ HTTPS/SSL certificate provisioning
- ✅ Backend API routing (REACT_APP_BACKEND_URL)
- ✅ Environment variable updates
- ✅ Fast loading optimization
- ✅ Mobile responsiveness
- ✅ Google Maps integration
- ✅ WhatsApp links functionality
- ✅ All internal navigation

---

## 📧 Email Integration Setup

### Overview
Contact form submissions are now configured to:
1. ✅ Save to MongoDB database
2. ✅ Send email notification to: **info@blessedmedicare.co.ke**
3. ✅ Display success message to users

### Step 1: Get Resend API Key

**Option A: Use Resend (Recommended - Free Tier Available)**

1. **Sign up at Resend**
   - Visit: https://resend.com
   - Create free account
   - Free tier: 100 emails/day, 3,000 emails/month

2. **Create API Key**
   - Dashboard → API Keys
   - Click "Create API Key"
   - Copy the key (starts with `re_...`)
   - **Save it securely** - you'll need it in Step 2

3. **Verify Your Domain (For Production)**
   - Go to: Domains → Add Domain
   - Add: blessedmedicare.co.ke
   - Add DNS records provided by Resend to your domain registrar
   - Verification usually takes 5-15 minutes

**Option B: Use Default Testing Mode**
- Keep RESEND_API_KEY empty
- Emails will only work in test mode
- Limited functionality but works for testing

### Step 2: Configure Backend Environment

1. **Update Backend .env File**
   
   Open `/app/backend/.env` and update:
   ```env
   # Email Configuration
   RESEND_API_KEY="re_your_actual_api_key_here"
   SENDER_EMAIL="onboarding@resend.dev"  # or noreply@blessedmedicare.co.ke after domain verification
   BUSINESS_EMAIL="info@blessedmedicare.co.ke"
   ```

2. **Restart Backend Service**
   ```bash
   sudo supervisorctl restart backend
   ```

3. **Verify Backend Logs**
   ```bash
   tail -f /var/log/supervisor/backend.out.log
   ```
   - Should show "Email notification sent" when form is submitted

### Step 3: Email Template Features

The automated email includes:
- ✅ Patient/visitor name
- ✅ Contact email
- ✅ Phone number
- ✅ Full message text
- ✅ Unique inquiry ID (for tracking)
- ✅ Timestamp
- ✅ Professional branding ("Designed & Managed by Mose Digital")

**Example Email Subject:**
```
New Contact Inquiry from John Doe
```

### Step 4: Test Email Functionality

1. **Visit Contact Form**
   - Go to: https://blessedmedicare.co.ke/contact (after domain setup)
   - Or: http://localhost:3000/contact (locally)

2. **Fill Out Form**
   - Name: Test Patient
   - Email: test@example.com
   - Phone: 0721999888
   - Message: "I would like to schedule an appointment"

3. **Submit Form**
   - Click "Send Message"
   - Should see: ✓ Success message
   - Check: info@blessedmedicare.co.ke for email

4. **Verify in Database**
   ```bash
   curl http://localhost:8001/api/contact
   ```
   - Should show the test submission

### Step 5: Production Domain Email Setup

**After domain verification with Resend:**

1. Update sender email in `/app/backend/.env`:
   ```env
   SENDER_EMAIL="noreply@blessedmedicare.co.ke"
   ```

2. This gives you:
   - ✅ Professional sender address
   - ✅ Better email deliverability
   - ✅ Reduced spam filtering
   - ✅ Brand consistency

3. Restart backend:
   ```bash
   sudo supervisorctl restart backend
   ```

---

## 🎨 Footer Branding Update

### What's Changed
Footer now displays professional branding on all pages:
```
© 2025 Blessed Medicare Centre. All rights reserved.
Designed & Managed by Mose Digital
```

### Styling
- ✅ Subtle and professional
- ✅ Non-intrusive placement
- ✅ Consistent across all pages
- ✅ Mobile responsive

---

## 📋 Complete Checklist

### Custom Domain Setup ✅
- [ ] Deploy application on Emergent
- [ ] Click "Link domain" in dashboard
- [ ] Enter: blessedmedicare.co.ke
- [ ] Click "Entri" and follow instructions
- [ ] Remove all existing A records from DNS
- [ ] Add new DNS records provided by Emergent
- [ ] Wait 5-15 minutes for propagation
- [ ] Verify site loads with HTTPS
- [ ] Test all pages and functionality

### Email Integration Setup ✅
- [ ] Sign up for Resend account
- [ ] Create API key
- [ ] Update RESEND_API_KEY in /app/backend/.env
- [ ] Configure BUSINESS_EMAIL: info@blessedmedicare.co.ke
- [ ] Restart backend service
- [ ] Test contact form submission
- [ ] Verify email received at info@blessedmedicare.co.ke
- [ ] Check inquiry saved in MongoDB
- [ ] (Optional) Verify domain with Resend for production sender

### Footer Branding ✅
- [x] Updated footer with "Designed & Managed by Mose Digital"
- [x] Applied to all pages
- [x] Professional styling implemented

---

## 🆘 Troubleshooting

### Domain Issues

**Problem:** Domain not loading after DNS changes
**Solution:**
1. Verify DNS propagation: whatsmydns.net
2. Clear browser cache
3. Try incognito/private mode
4. Check Emergent dashboard for errors
5. Re-link domain via "Entri"

**Problem:** HTTPS not working
**Solution:**
- Wait 15-30 minutes after DNS propagation
- SSL certificates are provisioned automatically
- Contact Emergent support if issue persists

### Email Issues

**Problem:** Emails not sending
**Solution:**
1. Check RESEND_API_KEY is correct in .env
2. Verify backend restarted after .env changes
3. Check backend logs for errors:
   ```bash
   tail -f /var/log/supervisor/backend.err.log
   ```
4. Ensure Resend account is active
5. Check Resend dashboard for delivery logs

**Problem:** Emails going to spam
**Solution:**
1. Verify domain with Resend
2. Use verified sender email (noreply@blessedmedicare.co.ke)
3. Add SPF, DKIM records from Resend to DNS
4. Ask recipients to whitelist info@blessedmedicare.co.ke

**Problem:** Form submits but no email
**Solution:**
1. Check MongoDB - inquiry should still be saved
2. Email sending is non-blocking (won't stop form submission)
3. Review backend logs for email errors
4. Verify BUSINESS_EMAIL is correct

---

## 📞 Support

### Domain & Deployment Issues
- Contact Emergent Support through dashboard
- Check Emergent documentation

### Email Service Issues
- Resend Support: https://resend.com/support
- Check Resend dashboard for delivery logs

### Website Functionality
- Review backend logs: `/var/log/supervisor/backend.err.log`
- Review frontend logs: Browser DevTools Console
- Check MongoDB for data persistence

---

## 🎉 Success Criteria

Your setup is complete when:
- ✅ https://blessedmedicare.co.ke loads successfully
- ✅ All pages navigate correctly
- ✅ Contact form submissions save to database
- ✅ Email notifications arrive at info@blessedmedicare.co.ke
- ✅ Success message displays to users
- ✅ Footer shows "Designed & Managed by Mose Digital"
- ✅ Mobile and desktop versions work perfectly
- ✅ WhatsApp button works
- ✅ Google Maps integration functions
- ✅ Image slideshow displays on home page

---

**Last Updated:** December 28, 2025
**Website:** Blessed Medicare Centre
**Domain:** blessedmedicare.co.ke
**Managed By:** Mose Digital
