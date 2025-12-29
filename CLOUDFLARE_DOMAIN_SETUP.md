# 🌐 Cloudflare Domain Setup - blessedmedicare.co.ke

## Quick Setup Guide for Emergent + Cloudflare

**Domain:** blessedmedicare.co.ke  
**DNS Provider:** Cloudflare  
**Platform:** Emergent

---

## 📋 Step-by-Step Setup

### Step 1: Get DNS Records from Emergent

1. **Log into Emergent Dashboard**
   - Visit: https://app.emergent.sh
   - Find your "Blessed Medicare Centre" project

2. **Initiate Domain Linking**
   - Click **"Link domain"** button
   - Enter: `blessedmedicare.co.ke`
   - Click **"Entri"**

3. **Copy the DNS Information**
   - Emergent will show you an IP address or hostname
   - **Example:** `123.45.67.89` (your actual IP will be different)
   - **WRITE THIS DOWN** - you'll need it for Cloudflare

---

### Step 2: Configure DNS in Cloudflare

#### A. Log into Cloudflare

1. Go to: https://dash.cloudflare.com
2. Log in with your Cloudflare account
3. Select domain: **blessedmedicare.co.ke**
4. Click on **"DNS"** in the left menu

#### B. Remove Old Records (CRITICAL!)

⚠️ **This step is ESSENTIAL**

1. Look for existing **A records** in the DNS table
2. Find any A records for:
   - `@` (root domain)
   - `*` (wildcard)
   - Any other A records pointing to old IPs

3. **Delete ALL old A records:**
   - Click the "Edit" or trash icon next to each A record
   - Confirm deletion
   - Make sure NO old A records remain

#### C. Add New A Record

**Add this DNS record:**

```
Type: A
Name: @
IPv4 address: [IP FROM EMERGENT]
Proxy status: DNS only (grey cloud ☁️)
TTL: Auto
```

**Important Settings:**
- **Name:** Type `@` (represents root domain)
- **IPv4 address:** Paste the IP Emergent gave you
- **Proxy status:** Click the cloud icon to make it **GREY** (DNS only)
  - ⚠️ Must be grey cloud, NOT orange
  - Orange cloud will cause issues during initial setup

**Screenshot Guide:**
```
┌────────────────────────────────────────────────┐
│ Type: A                                        │
│ Name: @                                        │
│ IPv4 address: 123.45.67.89  ← Your Emergent IP│
│ Proxy status: ☁️ (grey)     ← MUST BE GREY    │
│ TTL: Auto                                      │
│                                                │
│                          [Save]                │
└────────────────────────────────────────────────┘
```

#### D. Add CNAME for WWW (Optional but Recommended)

**Add this DNS record:**

```
Type: CNAME
Name: www
Target: blessedmedicare.co.ke
Proxy status: DNS only (grey cloud ☁️)
TTL: Auto
```

This ensures `www.blessedmedicare.co.ke` also works.

#### E. Save Changes

1. Click **"Save"** after adding each record
2. Verify both records appear in the DNS table
3. Ensure proxy status shows **grey cloud** ☁️

---

### Step 3: Wait for DNS Propagation

#### Expected Timeline:

```
⏱️ 0-5 minutes    → DNS changes saved in Cloudflare
⏱️ 5-15 minutes   → DNS propagating globally
⏱️ 15-30 minutes  → Most locations updated
⏱️ 30-60 minutes  → SSL certificate provisioned
🎉 60+ minutes    → Fully operational worldwide
```

#### Check Propagation:

**Method 1: Online DNS Checker**
1. Go to: https://www.whatsmydns.net
2. Enter: `blessedmedicare.co.ke`
3. Select: `A` record
4. Look for your new IP in multiple locations
5. ✅ Success when it shows your Emergent IP

**Method 2: Command Line**
```bash
nslookup blessedmedicare.co.ke
# Should return your Emergent IP
```

**Method 3: Try Accessing**
- Open incognito browser
- Visit: http://blessedmedicare.co.ke
- If site loads, DNS is working!

---

### Step 4: Verify SSL/HTTPS

#### Automatic SSL Provisioning

Emergent automatically provisions SSL certificates via Let's Encrypt.

**Timeline:**
- DNS must be propagated first (15-30 min)
- SSL provisioning starts automatically
- Certificate ready in 30-60 minutes total

#### Check SSL Status:

1. **After 30 minutes of DNS propagation:**
   - Try: https://blessedmedicare.co.ke
   - Look for padlock icon 🔒
   - Click padlock → Certificate should be valid

2. **If HTTPS doesn't work:**
   - Wait another 30 minutes
   - Check Emergent dashboard for SSL status
   - Ensure DNS is fully propagated first

#### Cloudflare SSL/TLS Settings:

1. In Cloudflare Dashboard → **SSL/TLS**
2. Set encryption mode to: **"Flexible"** or **"Full"**
3. **Do NOT** use "Full (strict)" initially
4. This setting works best with Emergent's SSL

---

## 🔧 Cloudflare-Specific Configuration

### Proxy Status Explained:

**Grey Cloud ☁️ (DNS Only)** ← Use this initially
- DNS resolution only
- Traffic goes directly to Emergent
- Recommended for initial setup
- Required for SSL to provision correctly

**Orange Cloud 🟠 (Proxied)** ← Can enable later
- Traffic goes through Cloudflare CDN
- Adds DDoS protection
- Can enable AFTER SSL is working
- May provide faster global delivery

### Enabling Cloudflare Proxy (After SSL Works):

**Only do this AFTER https:// works:**

1. Go to Cloudflare DNS settings
2. Find your A record
3. Click the grey cloud icon ☁️
4. It will turn orange 🟠
5. Save changes
6. Test site still works with https://

**Benefits of Orange Cloud:**
- ✅ Cloudflare CDN caching
- ✅ DDoS protection
- ✅ Better performance globally
- ✅ SSL at Cloudflare edge

---

## ✅ Verification Checklist

### Initial Setup (Grey Cloud):
- [ ] Old A records removed from Cloudflare
- [ ] New A record added with Emergent IP
- [ ] Proxy status is **grey cloud** ☁️
- [ ] WWW CNAME record added (optional)
- [ ] DNS propagated (checked on whatsmydns.net)
- [ ] http://blessedmedicare.co.ke loads your site
- [ ] https://blessedmedicare.co.ke works with SSL
- [ ] All pages accessible and working
- [ ] Contact form submits successfully
- [ ] Images and slideshow loading
- [ ] WhatsApp button functional

### Optional (Orange Cloud):
- [ ] SSL working with grey cloud first
- [ ] Switched A record to **orange cloud** 🟠
- [ ] Site still loads with https://
- [ ] Performance improved (test on mobile)
- [ ] No broken resources or mixed content warnings

---

## 🚨 Troubleshooting

### Problem: Site not loading after 30 minutes

**Solutions:**
1. ✅ Verify A record IP matches Emergent exactly
2. ✅ Confirm all old A records deleted
3. ✅ Ensure proxy status is **grey cloud** ☁️
4. ✅ Check whatsmydns.net shows new IP globally
5. ✅ Clear browser cache, try incognito
6. ✅ Try from different network (mobile data)
7. ✅ Wait up to 2 hours for global propagation

### Problem: SSL not working

**Solutions:**
1. ✅ Ensure HTTP works first (http://)
2. ✅ Wait 60-90 minutes after DNS propagation
3. ✅ Check Cloudflare SSL/TLS set to "Flexible"
4. ✅ Verify proxy status is grey cloud ☁️
5. ✅ Clear browser SSL cache
6. ✅ Check Emergent dashboard for SSL status

### Problem: Orange cloud causes issues

**Solutions:**
1. ✅ Switch back to grey cloud ☁️ temporarily
2. ✅ In Cloudflare → SSL/TLS → Set to "Flexible"
3. ✅ Purge Cloudflare cache (Caching → Purge Everything)
4. ✅ Wait 5 minutes, try again
5. ✅ If still broken, keep grey cloud

### Problem: Some pages work, others don't

**Solutions:**
1. ✅ Check Cloudflare Page Rules (delete if any exist)
2. ✅ Disable any Cloudflare firewall rules temporarily
3. ✅ Turn off "Under Attack Mode" if enabled
4. ✅ Check browser console for errors (F12)

### Problem: "Too many redirects" error

**Solutions:**
1. ✅ In Cloudflare SSL/TLS → Change to "Flexible"
2. ✅ Clear browser cookies and cache
3. ✅ Wait 5 minutes for changes to apply
4. ✅ If using grey cloud, should not happen

---

## 📊 DNS Records Summary

### What You Should See in Cloudflare:

```
┌────────┬──────┬────────────────────────┬────────┬─────┐
│ Type   │ Name │ Content                │ Proxy  │ TTL │
├────────┼──────┼────────────────────────┼────────┼─────┤
│ A      │ @    │ 123.45.67.89          │ ☁️     │ Auto│
│ CNAME  │ www  │ blessedmedicare.co.ke │ ☁️     │ Auto│
└────────┴──────┴────────────────────────┴────────┴─────┘

☁️ = Grey cloud (DNS only) - Required for initial setup
```

### Records to Remove:

❌ Any old A records
❌ Conflicting CNAME records for @
❌ Any AAAA records (IPv6) if present
❌ Old hosting provider records

---

## 🎯 Post-Setup: Enable Cloudflare Features

### After SSL is Working:

#### 1. Enable Proxy (Optional)
- Switch grey cloud ☁️ to orange cloud 🟠
- Provides CDN and DDoS protection
- Test thoroughly after enabling

#### 2. Cloudflare Performance Settings
- **Auto Minify:** Enable HTML, CSS, JS
- **Brotli:** Enable for better compression
- **Rocket Loader:** Test (may break some JS)

#### 3. Cloudflare Security
- **Security Level:** Medium
- **Bot Fight Mode:** Enable
- **Challenge Passage:** 30 minutes

#### 4. Page Rules (Careful!)
- Avoid creating page rules initially
- Can cause unexpected issues
- Only add if you know what you're doing

---

## 📞 Support Resources

### Cloudflare Support:
- **Dashboard:** https://dash.cloudflare.com
- **Community:** https://community.cloudflare.com
- **Docs:** https://developers.cloudflare.com

### Emergent Support:
- **Dashboard:** https://app.emergent.sh
- **Support:** Via dashboard chat

### DNS Tools:
- **Propagation:** https://www.whatsmydns.net
- **DNS Checker:** https://dnschecker.org
- **SSL Checker:** https://www.sslshopper.com/ssl-checker.html

---

## ✨ Website Features Confirmed Working

After domain connection, verify:

✅ **Layout:**
- Slideshow appears FIRST at top
- "Quality Healthcare You Can Trust" section below
- Booking and services buttons working
- All images loading correctly

✅ **Functionality:**
- Contact form submits to MongoDB
- Email notifications configured (needs Resend API key)
- WhatsApp button works (0721 480929)
- Google Maps integration functional
- All 6 pages accessible

✅ **Branding:**
- Footer shows "Website developed by Mose Digital"
- NO "Made with Emergent" watermark
- Professional medical green theme
- Mobile responsive design

✅ **Performance:**
- Fast loading times
- Optimized images with filters
- Smooth slideshow transitions
- Works on 3G/4G networks

---

## 🎉 Success Indicators

You'll know setup is complete when:

1. ✅ https://blessedmedicare.co.ke loads with padlock 🔒
2. ✅ Slideshow appears first with facility photos
3. ✅ All images blend nicely with filters
4. ✅ Contact form works
5. ✅ Footer shows "Website developed by Mose Digital"
6. ✅ No watermark visible
7. ✅ Mobile view looks professional
8. ✅ Site loads in under 3 seconds

---

**Setup Guide Version:** 2.0 (Cloudflare Edition)  
**Last Updated:** December 29, 2025  
**Domain:** blessedmedicare.co.ke  
**DNS Provider:** Cloudflare  
**Website Developer:** Mose Digital

---

**Need Help?** Contact Cloudflare support or Emergent support via their respective dashboards.
