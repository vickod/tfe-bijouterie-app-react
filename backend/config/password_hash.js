const bcrypt = require('bcrypt');

// Fonction pour crypter un mot de passe
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Fonction pour comparer un mot de passe clair avec un mot de passe crypté
const comparePasswords = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = { hashPassword, comparePasswords };
