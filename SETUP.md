# AI World Chat - Setup Guide

## Why This Approach?

Your original code exposed the Venice API key directly in the HTML file. This is a **security risk** because:
- Anyone viewing the page source can see it
- Bots can scrape GitHub for exposed keys
- Anyone can use your key to make requests (and incur costs)

This solution uses a **backend proxy** that keeps your API key safe on the server.

---

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and add your Venice API key:

```bash
cp .env.example .env
```

Edit `.env`:
```
VENICE_API_KEY=your_actual_venice_api_key_here
PORT=3000
```

**Important:** Never commit `.env` to Git! It's in `.gitignore` for this reason.

### 3. Run Locally
```bash
npm start
```

Your server will run on `http://localhost:3000`
- Frontend: `http://localhost:3000` (serves `index.html`)
- API endpoints: `/api/chat`, `/api/image`, `/api/tts`, `/api/models`

---

## Deployment Options

### Option 1: Heroku (Easy)
```bash
heroku create your-app-name
heroku config:set VENICE_API_KEY=your_key_here
git push heroku main
```

### Option 2: Railway
1. Connect your GitHub repo to Railway
2. Add `VENICE_API_KEY` environment variable in Railway dashboard
3. Deploy automatically

### Option 3: Render
1. Create new Web Service on render.com
2. Connect GitHub repo
3. Add environment variable `VENICE_API_KEY`
4. Set start command: `npm start`

### Option 4: Your Own Server
1. Install Node.js on your server
2. Clone repo and run `npm install`
3. Set environment variable: `VENICE_API_KEY=your_key`
4. Run: `npm start`
5. Use a reverse proxy (Nginx) to handle HTTPS

---

## How It Works

**Before (Insecure):**
```
Browser → Venice API (with exposed key in HTML)
```

**After (Secure):**
```
Browser → Your Backend → Venice API (key hidden on server)
```

The frontend now makes requests to `/api/chat`, `/api/image`, etc. instead of calling Venice directly.

---

## GitHub Setup

1. Push code to GitHub (the `.env` file is ignored)
2. Deploy to a service like Heroku or Railway (they store your API key securely)
3. Users visit your deployed site, not the GitHub repo
4. No one can see your API key

---

## File Structure
```
├── index.html          # Frontend (no API key!)
├── server.js           # Backend proxy (stores API key safely)
├── package.json        # Dependencies
├── .env                # Your secret key (ignored by Git)
├── .env.example        # Template (safe to commit)
└── .gitignore          # Prevents .env from being committed
```

---

## Testing Locally

1. Start server: `npm start`
2. Open `http://localhost:3000`
3. Try the chat, image generation, etc.
4. Check Network tab in DevTools - you'll see requests to `/api/*` instead of `api.venice.ai`

---

## Security Checklist

- [x] API key removed from HTML
- [x] API key stored in `.env` (not committed to Git)
- [x] Backend handles all API calls
- [x] Frontend never touches the actual API key
- [x] CORS enabled for your domain only (optional - update `cors()` in server.js)

---

## Next Steps

1. Install dependencies: `npm install`
2. Create `.env` file with your Venice API key
3. Test locally: `npm start`
4. Deploy to Heroku, Railway, or your own server
5. Update Discord links in `index.html` if needed
