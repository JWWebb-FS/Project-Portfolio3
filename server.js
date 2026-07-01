
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const os = require('os');
require('dotenv').config();
const {sequelize} = require('./config/database');
const authRouter = require('./routes/auth');
const Token = require('./config/Token');


const app = express();
const port = process.env.PORT || 3001;
const host = '0.0.0.0';

function getLocalNetworkIp() {
  const interfaces = os.networkInterfaces();

  for (const addresses of Object.values(interfaces)) {
    for (const address of addresses || []) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }

  return null;
}

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/search', async (req, res) => {
  const searchTerm = req.query.q;
  const authHeader = req.headers.authorization;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || process.env.SPOTIFY_CLIENT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const storedToken = await Token.findOne({
      where: {
        userId,
        token,
      },
    });

    if (!storedToken) {
      return res.status(401).json({ error: 'Token not found' });
    }

    if (storedToken.expiresAt <= new Date()) {
      return res.status(401).json({ error: 'Token has expired' });
    }

    const spotifyResponse = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        type: 'artist',
        q: searchTerm,
      },
      headers: {
        Authorization: `Bearer ${storedToken.spotifyAccessToken}`,
      },
    });

    return res.json(spotifyResponse.data);
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired authorization token' });
    }

    const status = error.response?.status || 500;
    const details = error.response?.data || error.message;

    return res.status(status).json({
      error: 'Search failed',
      details,
    });
  }
});

sequelize.sync()
  .then(() => {
    app.listen(port, host, () => {
      const networkIp = getLocalNetworkIp();

      console.log(`Server is listening on port ${port}`);
      console.log(`Local URL: http://localhost:${port}`);
      if (networkIp) {
        console.log(`Network URL: http://${networkIp}:${port}`);
      } else {
        console.log('Network URL: unavailable - no local network IP found');
      }
    });
  })
  .catch((error) => {
    console.error('Database sync error:', error);
  });
