# 🚀 Quick Setup Guide

## Fast Track Installation (5 minutes)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Replace the Tunnel URL

Open these files and replace `TU_URL_DEL_TUNEL` with your actual URL:

#### File: `app/page.tsx`
- **Line ~40**: Login redirect
- **Line ~45**: Add to Discord (also add your Discord Client ID)

```typescript
// Example:
window.location.href = 'https://aimed-finds-cgi-rides.trycloudflare.com/auth/login';
```

#### File: `app/dashboard/page.tsx`
- **Line ~40**: API fetch for guilds
- **Line ~51**: Login redirect

```typescript
// Example:
const response = await fetch(`https://aimed-finds-cgi-rides.trycloudflare.com/auth/guilds?token=${token}`);
```

### 3️⃣ Run the Project
```bash
npm run dev
```

Open: http://localhost:3000

---

## Your Current Tunnel URL
```
https://aimed-finds-cgi-rides.trycloudflare.com
```

## Find & Replace
Use your code editor's "Find & Replace" feature:

**Find:** `TU_URL_DEL_TUNEL`
**Replace with:** `https://aimed-finds-cgi-rides.trycloudflare.com`

Files to update:
- ✅ `app/page.tsx`
- ✅ `app/dashboard/page.tsx`

---

## Expected API Endpoints

Your backend should have these endpoints:

### 1. Login Redirect
```
GET https://aimed-finds-cgi-rides.trycloudflare.com/auth/login
```
Redirects to Discord OAuth, then back to dashboard with token

### 2. Get User Guilds
```
GET https://aimed-finds-cgi-rides.trycloudflare.com/auth/guilds?token={token}
```

Returns:
```json
[
  {
    "id": "server_id",
    "name": "Server Name",
    "icon": "icon_hash_or_null",
    "memberCount": 1250,
    "status": "online"
  }
]
```

---

## Testing Flow

1. **Visit**: http://localhost:3000
2. **Click**: "Login with Discord" or "Go to Dashboard"
3. **Discord**: Authorize the bot
4. **Redirect**: Back to dashboard with token
5. **View**: Your servers list

---

## Common Issues

### ❌ "Cannot find module"
```bash
npm install
```

### ❌ "useSearchParams error"
Already fixed with `<Suspense>` wrapper ✅

### ❌ "API not responding"
Check your tunnel is running and URL is correct

---

## Build for Production

```bash
npm run build
npm start
```

Deploy to Vercel:
```bash
vercel
```

---

**That's it! You're ready to go! 🎉**
