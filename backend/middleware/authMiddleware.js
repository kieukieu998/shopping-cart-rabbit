const jwt = require("jsonwebtoken");
const User = require("../models/User");
const e = require("express");

//Middleware to protect routes

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Lấy token từ header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token

      req.user = await User.findById(decoded.user.id).select("-password"); //Exclude password
      next();
    } catch (error) {
        console.error("Token verification failed", error);

        res.status(401).json({message: "Not authorized, token failed"});
    }
  } else {
    res.status(401).json({message: "Not authorizes, no token provided"})
  }
};

// Middleware to check ì the user is an admin
const admin = (req, res, next) => {
  if(req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin"});
  }
};

module.exports = {protect, admin};
