const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

/**
 * Reads the currently signed-in user from a JWT token passed in the Authorization header.
 *
 * Expected header: Authorization: Bearer <token>
 *
 * @param {import('express').Request} req
 * @returns {object|null} The decoded token payload (e.g. { userId, email }) or null when missing/invalid
 */
function getCurrentUser(req) {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader || typeof authHeader !== 'string') {
    return null;
  }

  const [scheme, token] = authHeader.split(' ');
  if (!scheme || !token || scheme.toLowerCase() !== 'bearer') {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}

const get_current_user = getCurrentUser;

module.exports = {
  getCurrentUser,
  get_current_user,
};
