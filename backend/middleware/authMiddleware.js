const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers["authorization"];

    // If token missing
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No Token Provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find logged-in user
    req.user = await User.findById(decoded.id);

    // Move to next function
    next();
  } catch (error) {
    console.log(error);

    res.status(401).send({
      success: false,
      message: "Invalid Token",
      error,
    });
  }
};
// Role middleware
const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    
    // Check user role
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        success: false,
        message: "Access Denied",
      });
    }

    // Allow access
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };