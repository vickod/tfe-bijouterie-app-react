const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  // generate token
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "1d", // 3600 secondes * 24 heures
  });
  // set jwt as http-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1jour
  });
}

module.exports = generateToken;