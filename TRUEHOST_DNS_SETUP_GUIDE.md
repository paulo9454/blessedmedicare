# 🌐 Custom Domain Setup Guide - TRUEHOST Kenya

## Complete Guide for blessedmedicare.co.ke

**Domain:** blessedmedicare.co.ke  
**Registrar:** TRUEHOST Kenya  
**Project:** Blessed Medicare Centre  
**Status:** ✅ Ready for Connection

---

## 📋 Pre-Setup Checklist

✅ Domain purchased from TRUEHOST Kenya: blessedmedicare.co.ke  
✅ Application deployed on Emergent  
✅ "Made with Emergent" watermark removed  
✅ Site metadata updated  
✅ Footer updated to "Website developed by Mose Digital"  
✅ SSL will be auto-enabled after DNS propagation

---

## 🚀 Step-by-Step Setup Process

### PART 1: Get DNS Records from Emergent

1. **Log into Emergent Dashboard**
   - Go to: https://app.emergent.sh
   - Find your "Blessed Medicare Centre" project

2. **Click "Link domain"**
   - Look for the domain connection button
   - It might say "Link domain" or "Custom domain"

3. **Enter Your Domain**
   ```
   blessedmedicare.co.ke
   ```
   - Type exactly as shown above
   - Do NOT include www or https://

4. **Click "Entri"**
   - This will initiate the connection process
   - Emergent will show you the exact DNS records

5. **⚠️ IMPORTANT: Copy the DNS Information**
   - You'll see an IP address (example: 123.45.67.89)
   - Or you might see a hostname (example: xyz.emergent.host)
   - **WRITE THIS DOWN** - you'll need it for Truehost

---

### PART 2: Configure DNS in TRUEHOST Kenya

#### Step 1: Log into TRUEHOST

1. Go to: https://truehost.co.ke/clients/clientarea.php
2. Log in with your TRUEHOST account credentials
3. Navigate to **"Services"** → **"My Services"**
4. Find **blessedmedicare.co.ke** and click **"Manage Domain"**

#### Step 2: Access DNS Management

1. Look for **"DNS Management"** or **"Manage DNS"**
2. Or find **"Advanced DNS"** section
3. You should see a list of existing DNS records

#### Step 3: Remove Existing A Records (CRITICAL!)

⚠️ **This step is VERY IMPORTANT**

1. Look for any existing **A records**
2. **Delete ALL existing A records** for:
   - @ (root domain)
   - * (wildcard)
   - Any other A records you see

**Why?** Old A records will conflict with new ones and prevent your site from working.

#### Step 4: Add New A Record (Root Domain)

Add this record for **blessedmedicare.co.ke**:

```
Type: A
Name/Host: @ (or leave blank, or type @)
Value/Points to: [IP ADDRESS FROM EMERGENT]
TTL: 3600 (or default)
```

**Example:**
- If Emergent gave you: `123.45.67.89`
- Then enter: `123.45.67.89` in the Value field

**TRUEHOST Field Names (might vary):**
- "Name" might be called: Host, Record Name, or Hostname
- "Value" might be called: Points to, Target, or IP Address
- "TTL" might be: Time to Live (leave default if unsure)

#### Step 5: Add CNAME Record (WWW Subdomain)

Add this record for **www.blessedmedicare.co.ke**:

```
Type: CNAME
Name/Host: www
Value/Points to: blessedmedicare.co.ke (your root domain)
TTL: 3600 (or default)
```

This ensures www.blessedmedicare.co.ke also works.

#### Step 6: Save DNS Changes

1. Click **"Save"** or **"Save Changes"** or **"Update DNS"**
2. Some systems require clicking **"Apply Changes"**
3. You might see a confirmation message

---

### PART 3: Wait for DNS Propagation

#### Timeline:
- ⏱️ **Typical**: 5-15 minutes
- ⏰ **Average**: 30 minutes to 2 hours
- 🕐 **Maximum**: Up to 24 hours (rare in Kenya)

#### Check Propagation Status:

**Option 1: Use Online Tools**
- Go to: https://www.whatsmydns.net
- Enter: `blessedmedicare.co.ke`
- Select: `A` record type
- Check locations including Kenya/Nairobi
- Your new IP should show up

**Option 2: Use nslookup (for tech users)**
```bash
nslookup blessedmedicare.co.ke
```
Should return the new IP address

**Option 3: Try accessing the site**
- Open incognito/private browser window
- Go to: http://blessedmedicare.co.ke
- If it loads, DNS is working!

---

### PART 4: Verify SSL/HTTPS

#### Automatic SSL Provisioning

Emergent automatically provisions SSL certificates when:
1. ✅ DNS is fully propagated
2. ✅ Domain points to correct IP address
3. ✅ Website is responding on HTTP

#### Checking SSL Status:

**After 15-30 minutes of DNS propagation:**

1. Try accessing: https://blessedmedicare.co.ke (with https)
2. Look for the padlock icon in browser
3. Certificate should say "Let's Encrypt" or similar

**If HTTPS doesn't work immediately:**
- Wait another 30 minutes
- SSL provisioning can take up to 1 hour after DNS propagation
- Check back in Emergent dashboard for SSL status

---

## 🔧 TRUEHOST Kenya Specific Tips

### Common TRUEHOST Interface Variations:

**If you see "cPanel":**
1. Look for "Zone Editor" or "DNS Zone Editor"
2. Or use "Advanced DNS Zone Editor"
3. Same steps apply - remove old A records, add new ones

**If you see "DirectAdmin":**
1. Go to Account Manager → DNS Management
2. Select blessedmedicare.co.ke
3. Same steps apply

**If you see "Custom Control Panel":**
1. Look for DNS Management section
2. Should have A Records and CNAME Records options
3. Follow same removal and addition steps

### TRUEHOST Support Contact:

If you have trouble finding DNS management:
- **Email:** support@truehost.co.ke
- **Phone:** +254 709 956 000
- **Live Chat:** Available on truehost.co.ke
- Tell them: "I need to update A records for blessedmedicare.co.ke"

---

## ✅ DNS Records Summary

### What You Need to Add:

#### Record 1: Root Domain (blessedmedicare.co.ke)
```
Type: A
Host: @
Value: [IP from Emergent - example: 123.45.67.89]
TTL: 3600
```

#### Record 2: WWW Subdomain (www.blessedmedicare.co.ke)
```
Type: CNAME
Host: www
Value: blessedmedicare.co.ke
TTL: 3600
```

### What to Remove:
- ❌ All existing A records
- ❌ Any old website IP addresses
- ❌ Conflicting DNS entries

---

## 🚨 Troubleshooting Guide

### Problem 1: Site Not Loading After 15 Minutes

**Solution:**
1. Go back to TRUEHOST DNS management
2. Verify the A record is there with correct IP
3. Check you removed ALL old A records
4. Try clearing your browser cache
5. Try accessing in incognito/private mode
6. Check whatsmydns.net for propagation status

### Problem 2: Gets Old Site or Error Page

**Solution:**
1. Double-check the IP address in TRUEHOST matches Emergent
2. Ensure you typed @ or left Host blank for root domain
3. Wait another 30 minutes for global propagation
4. Clear browser cache and cookies
5. Try from mobile data (different network)

### Problem 3: WWW Doesn't Work

**Solution:**
1. Verify CNAME record is added for "www"
2. CNAME should point to: blessedmedicare.co.ke (not the IP)
3. Wait for DNS propagation
4. Some registrars need 30+ minutes for CNAME propagation

### Problem 4: SSL/HTTPS Not Working

**Solution:**
1. First ensure HTTP works (http://blessedmedicare.co.ke)
2. Wait 30-60 minutes after DNS propagation
3. SSL is provisioned automatically but takes time
4. Check Emergent dashboard for SSL status
5. If still no SSL after 2 hours, contact Emergent support

### Problem 5: "DNS_PROBE_FINISHED_NXDOMAIN" Error

**Solution:**
1. This means DNS records aren't propagated yet
2. Wait longer (up to 24 hours max)
3. Verify records are saved in TRUEHOST
4. Check whatsmydns.net shows your IP globally
5. Try from different device/network

---

## 📊 Expected Timeline

```
0 min    → Configure DNS in TRUEHOST
↓
5-15 min → DNS starts propagating
↓
15-30 min → HTTP works (http://blessedmedicare.co.ke)
↓
30-60 min → HTTPS works (SSL provisioned)
↓
60 min+ → Fully propagated globally
```

---

## ✅ Post-Setup Verification Checklist

After DNS propagation is complete, verify:

- [ ] http://blessedmedicare.co.ke loads your website
- [ ] https://blessedmedicare.co.ke loads with padlock icon
- [ ] www.blessedmedicare.co.ke redirects properly
- [ ] All pages work (Home, About, Services, Contact, Gallery, Reviews)
- [ ] Contact form submits successfully
- [ ] WhatsApp button works (0721 480929)
- [ ] Google Maps loads on Contact page
- [ ] Image slideshow works on Home page
- [ ] Site looks correct on mobile
- [ ] Footer shows "Website developed by Mose Digital"
- [ ] NO "Made with Emergent" watermark visible
- [ ] Site loads fast (under 3 seconds)

---

## 🎯 What Changed in Your Website

### ✅ Updates Made:

1. **Metadata Updated:**
   - Title: "Blessed Medicare Centre - Quality Healthcare in Nairobi | 24/7 Medical Services"
   - Description: Professional medical services SEO text
   - Keywords: Relevant healthcare terms for Nairobi
   - Open Graph tags for social media sharing
   - Twitter card meta tags

2. **Watermark Removed:**
   - "Made with Emergent" badge hidden
   - Badge is in HTML but set to `display: none`

3. **Footer Updated:**
   - Changed from "Designed & Managed by Mose Digital"
   - Now says: "Website developed by Mose Digital"

4. **SEO Optimized:**
   - Proper meta description for search engines
   - Keywords relevant to Kenya healthcare
   - Location-specific terms (Nairobi, Pipeline)

---

## 📞 Support Contacts

### TRUEHOST Kenya Support:
- **Email:** support@truehost.co.ke
- **Phone:** +254 709 956 000
- **Website:** https://truehost.co.ke

### Emergent Platform Support:
- **Dashboard:** https://app.emergent.sh
- **Support:** Via dashboard chat/support section

### Website Developer:
- **Mose Digital**
- All website functionality inquiries

---

## 🔐 Security Notes

### What's Included:

✅ **Automatic SSL/HTTPS** - Provided by Emergent (Let's Encrypt)
✅ **Secure MongoDB Connection** - Backend database encrypted
✅ **Environment Variables** - Sensitive data stored securely
✅ **CORS Protection** - Backend API protected
✅ **Input Validation** - Contact form validates user input

### Best Practices:

- ✅ Always use https:// when sharing your website URL
- ✅ Keep TRUEHOST account credentials secure
- ✅ Monitor contact form submissions regularly
- ✅ Update Resend API key for email notifications

---

## 📱 Mobile & Performance

Your website is optimized for:

✅ **Mobile Devices** - Fully responsive design
✅ **Tablets** - Works on iPad, Android tablets
✅ **Desktop** - Optimized for large screens
✅ **Fast Loading** - Images optimized, code minified
✅ **Low Bandwidth** - Works on 3G/4G networks

**Test on mobile:**
- Open blessedmedicare.co.ke on your phone
- Try submitting contact form
- Check WhatsApp button works
- Verify all pages navigate correctly

---

## 🎉 Success Indicators

You'll know setup is complete when:

1. ✅ https://blessedmedicare.co.ke loads with padlock
2. ✅ Homepage slideshow shows your facility photos
3. ✅ Contact form works and saves to database
4. ✅ Footer shows "Website developed by Mose Digital"
5. ✅ No "Made with Emergent" watermark visible
6. ✅ All 6 pages accessible and working
7. ✅ Mobile view looks professional
8. ✅ WhatsApp and Maps integrations work

---

## 📝 Quick Reference Card

```
DOMAIN: blessedmedicare.co.ke
REGISTRAR: TRUEHOST Kenya

DNS RECORDS TO ADD:
1. A Record: @ → [Emergent IP]
2. CNAME: www → blessedmedicare.co.ke

DNS TO REMOVE:
- All old A records

WAIT TIME: 15-30 minutes typical
SSL: Automatic after DNS propagates

VERIFY AT: https://www.whatsmydns.net
CHECK: https://blessedmedicare.co.ke
```

---

**Setup Guide Version:** 1.0  
**Last Updated:** December 28, 2025  
**Website Developer:** Mose Digital  
**Domain:** blessedmedicare.co.ke

---

**Need Help?** Contact TRUEHOST support or refer to Emergent dashboard for DNS record details.
