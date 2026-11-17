import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from the token
      req.admin = await Admin.findById(decoded.id).select('-password');
      
      next(); // Move to the next function
    } catch (error) {
      console.error("JWT Error:", error.message); // <--- This will print in VS Code terminal
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.log("Header received:", req.headers.authorization); // <--- Debug log
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};