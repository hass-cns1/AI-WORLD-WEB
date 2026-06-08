# Troubleshooting Guide

## Error: "NetworkError when attempting to fetch resource"

This usually means the frontend can't reach the backend. Here's how to fix it:

### Step 1: Check if the server is running

```bash
npm start
```

You should see:
```
Server running on port 3000
```

If you see an error like `VENICE_API_KEY not set`, go to Step 2.

### Step 2: Verify your .env file

Make sure you have a `.env` file in your project folder with:
```
VENICE_API_KEY=your_actual_key_here
PORT=3000
```

**Important:** 
- Don't use quotes around the key
- Make sure there are no spaces
- The file should be named exactly `.env` (not `.env.txt` or `.env.local`)

### Step 3: Test the backend connection

1. Start the server: `npm start`
2. Open a new tab and go to: `http://localhost:3000/api/health`
3. You should see: `{"status":"ok","message":"Server is running"}`

If you see an error, the server isn't running or the port is wrong.

### Step 4: Check the browser console

1. Open the chat page: `http://localhost:3000`
2. Press `F12` to open Developer Tools
3. Click the "Console" tab
4. Look for messages starting with `✓` (good) or `✗` (error)
5. Copy any error messages and check below

### Common Error Messages

#### "Cannot connect to backend"
- Server not running? → Run `npm start`
- Wrong port? → Check `.env` file has correct PORT
- Are you on localhost:3000? → Yes, visit `http://localhost:3000`

#### "API Error: 401"
- Your Venice API key is invalid or expired
- Check your `.env` file has the correct key
- Try generating a new key from Venice dashboard

#### "API Error: 403"
- Your Venice API key doesn't have permission
- Check your account on Venice dashboard

#### "API Error: 500"
- Server error - check server console for details
- Make sure Node.js is installed: `node --version`

### Step 5: File permissions

Make sure all files are readable:
```bash
ls -la
```

You should see all your files listed.

### Step 6: Node.js version

Check you have Node.js 14+:
```bash
node --version
npm --version
```

If not installed, download from https://nodejs.org

### Step 7: Clear browser cache

1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Select "All time"
3. Check "Cookies and other site data"
4. Click "Clear data"
5. Reload the page

### Still stuck?

Check these files exist in your folder:
- `index.html`
- `server.js`
- `package.json`
- `.env` (with your API key)
- `node_modules/` folder

Run these commands in order:
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

Then visit `http://localhost:3000` and check the browser console (F12).
