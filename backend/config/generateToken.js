const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  // generate token
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    //expiresIn: "1d", // 3600 secondes * 24 heures
    expiresIn: "30d", // 30 jours
  });
  // set jwt as http-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    //maxAge: 1 * 24 * 60 * 60 * 1000, // 1jour
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
  });
}

const generateResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Le token expirera après 1 heure
  });
  };


  const validateAndDecodeResetToken = (token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken.userId;
    } catch (error) {
      return null;
    }
  };

module.exports = {generateToken, generateResetToken, validateAndDecodeResetToken};

