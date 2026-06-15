const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Token = require('../config/Token');

const router = express.Router();

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_PROFILE_URL = 'https://api.spotify.com/v1/me';

function getRedirectUri() {
  return process.env.REDIRECT_URI || `http://127.0.0.1:${process.env.PORT || 3001}/auth/callback`;
}

router.get('/login', (req, res) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: getRedirectUri(),
    scope: 'user-read-email user-read-private',
  });

  res.redirect(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
});

router.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    const credentials = Buffer
      .from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)
      .toString('base64');

    const tokenResponse = await axios.post(
      SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: getRedirectUri(),
      }),
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token: accessToken, expires_in: expiresIn } = tokenResponse.data;

    const userResponse = await axios.get(SPOTIFY_PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;
    const jwtSecret = process.env.JWT_SECRET || process.env.SPOTIFY_CLIENT_SECRET;
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const authToken = jwt.sign({ user }, jwtSecret, { expiresIn });

    await Token.create({
      token: authToken,
      userId: user.id,
      spotifyAccessToken: accessToken,
      expiresAt,
    });

    return res.redirect(`http://localhost:5173?token=${authToken}`);
  } catch (error) {
    const message = error.response?.data || error.message;
    return res.status(500).json({
      error: 'Spotify authentication failed',
      details: message,
    });
  }
});

module.exports = router;
