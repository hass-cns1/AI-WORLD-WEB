const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for all origins (you can restrict this later)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files (index.html, etc.)

const VENICE_API_KEY = process.env.VENICE_API_KEY;
const VENICE_API_URL = 'https://api.venice.ai/api/v1/chat/completions';
const VENICE_IMAGE_URL = 'https://api.venice.ai/api/v1/image/generate';
const VENICE_TTS_URL = 'https://api.venice.ai/api/v1/audio/speech';
const VENICE_MODELS_URL = 'https://api.venice.ai/api/v1/models';

if (!VENICE_API_KEY) {
  console.error('ERROR: VENICE_API_KEY environment variable not set!');
  console.error('Please create a .env file with your API key.');
  process.exit(1);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Proxy endpoint for chat completions
app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(VENICE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VENICE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Proxy endpoint for image generation
app.post('/api/image', async (req, res) => {
  try {
    const response = await fetch(VENICE_IMAGE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VENICE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) throw new Error('Image generation failed');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Image error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Proxy endpoint for TTS
app.post('/api/tts', async (req, res) => {
  try {
    const response = await fetch(VENICE_TTS_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VENICE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) throw new Error('TTS failed');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('TTS error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Proxy endpoint for models list
app.get('/api/models', async (req, res) => {
  try {
    const response = await fetch(VENICE_MODELS_URL, {
      headers: { 'Authorization': `Bearer ${VENICE_API_KEY}` }
    });

    if (!response.ok) throw new Error('Failed to load models');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Models error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
