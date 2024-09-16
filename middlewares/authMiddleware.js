const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (token == null) return res.status(401).json({ message: 'No token provided' });

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    // Attach user information to request
    req.user = user;
    next();
  });
};

const checkAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'You are not authorized to perform this action' });
  }
  next();
};

module.exports = { authMiddleware, checkAdmin };
