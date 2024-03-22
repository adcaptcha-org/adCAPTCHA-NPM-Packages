const express = require('express');
const { verify } = require('@adcaptcha/node');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: '.env.local' });

app.use(cors());
app.use(express.json());

app.post('/verifyToken', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const token = req.body.token;
  console.log('API Key:', apiKey);
  console.log('Token:', token);

  try {
    const response = await verify(apiKey, token);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify token' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
