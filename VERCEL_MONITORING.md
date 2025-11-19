# Vercel Monitoring & Debugging Guide

## 🔍 Step 1: Check Environment Variables on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (portfolio-next)
3. Go to **Settings** → **Environment Variables**
4. Verify these variables are set for **Production**:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN` (optional)

**If missing, add them from your `.env.local` file!**

## 🧪 Step 2: Test the Debug Endpoint

After deploying, test the debug endpoint:

```bash
# Test on production
curl https://ahmedtabib.com/api/views/debug

# Or visit in browser:
# https://ahmedtabib.com/api/views/debug
```

Expected response:
```json
{
  "status": "success",
  "redis": {
    "connected": true,
    "ping": "PONG"
  },
  "visitors": {
    "total": 123,
    "sampleIds": ["ABC123", "DEF456", ...]
  },
  "environment": {
    "KV_REST_API_URL": true,
    "KV_REST_API_TOKEN": true
  },
  "timestamp": "2024-..."
}
```

If you see `"connected": false` or errors, your KV credentials are not configured properly.

## 📊 Step 3: View Stats on Vercel KV Dashboard

### Option A: Vercel KV Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** in the sidebar
3. Select your KV database
4. Click **Data Browser**
5. Search for key: `portfolio:visitors`
6. You'll see all unique visitor IDs stored in the Set

### Option B: Upstash Dashboard (Direct)
1. Go to [Upstash Console](https://console.upstash.io/)
2. Select your Redis database (casual-guppy-25394)
3. Go to **CLI** tab
4. Run these commands:

```redis
# Get total visitor count
SCARD portfolio:visitors

# View all visitor IDs
SMEMBERS portfolio:visitors

# Check if specific ID exists
SISMEMBER portfolio:visitors "ABC123"
```

## 🔎 Step 4: Monitor Logs on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Deployments** → Select latest deployment
4. Click **Functions** tab
5. Click on `/api/views` function
6. View real-time logs

You should see logs like:
```
[API /views POST] Received request
[API /views POST] Visitor ID: ABC123
[API /views POST] Redis SADD result: 1 (1 = new visitor, 0 = existing)
[API /views POST] New total: 124
```

## 🧪 Step 5: Test Visitor Counter on Production

1. Open https://ahmedtabib.com in **incognito/private window**
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. You should see logs:
```
[VisitorCounter] Running on production, incrementing views...
[VisitorCounter] Generated visitor ID: ABC123
[VisitorCounter] Incrementing view count...
[VisitorCounter] POST response status: 200
[VisitorCounter] Updated count: 124
```

5. If you see errors, note them down

## 🚨 Common Issues & Solutions

### Issue 1: Count stays at 0
**Cause**: Environment variables not set on Vercel
**Solution**: Add KV credentials to Vercel → Settings → Environment Variables → Redeploy

### Issue 2: Counter doesn't increment when you visit
**Cause**: You're being counted as the same unique visitor
**Solution**: Try these different browsers/devices:
- Different browser (Chrome, Firefox, Safari)
- Incognito/Private window
- Mobile device
- Different computer

**Remember**: The counter tracks **unique visitors**, not total page views!

### Issue 3: Error: "Cannot connect to Redis"
**Cause**: Wrong KV credentials
**Solution**:
1. Go to Upstash Dashboard
2. Copy the correct credentials
3. Update on Vercel
4. Redeploy

### Issue 4: Logs show "No visitor ID provided"
**Cause**: Issue with client-side ID generation
**Solution**: Check browser console for JavaScript errors

## 📈 Step 6: Set Initial Visitor Count (Optional)

If you want to set a starting count:

```bash
# Set to 1000 visitors
curl -X POST https://ahmedtabib.com/api/views/set \
  -H "Content-Type: application/json" \
  -d '{"count": 1000}'
```

⚠️ **Security**: This endpoint should be protected with authentication in production!

## 🔄 Step 7: Manual Testing Commands

```bash
# 1. Get current count
curl https://ahmedtabib.com/api/views

# 2. Add a test visitor
curl -X POST https://ahmedtabib.com/api/views \
  -H "Content-Type: application/json" \
  -d '{"id": "test-visitor-123"}'

# 3. Check debug info
curl https://ahmedtabib.com/api/views/debug

# 4. Add same visitor again (should not increment)
curl -X POST https://ahmedtabib.com/api/views \
  -H "Content-Type: application/json" \
  -d '{"id": "test-visitor-123"}'
```

## 📱 Step 8: Real-Time Monitoring

### Vercel Analytics
1. Go to Vercel Dashboard → Your Project → **Analytics**
2. View page views, unique visitors, geography

### Vercel Logs (Real-Time)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View logs in real-time
vercel logs --follow
```

## 🎯 Quick Checklist

- [ ] Environment variables set on Vercel
- [ ] Debug endpoint returns success
- [ ] KV dashboard shows visitor data
- [ ] Console logs appear when visiting site
- [ ] Counter increments with different browsers/devices
- [ ] Vercel logs show API calls

## 📞 Need Help?

If counter still doesn't work after checking all above:
1. Share the debug endpoint output
2. Share browser console logs
3. Share Vercel function logs
4. I'll help troubleshoot!
