// authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
  const excludedRoutes = ['/register', '/login']; // Add the routes you want to exclude from authentication here
  const isExcludedRoute = excludedRoutes.includes(req.path);

  if (isExcludedRoute) {
    // Skip authentication for excluded routes
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded._id; // Set the req.user as the decoded user ID
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};
