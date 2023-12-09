const asyncHandler = require('../middleware/asyncHandler');
const {Utilisateur, Role} = require('../dev-data/schema');
const { hashPassword, comparePasswords } = require('../config/password_hash')
const {generateResetToken, validateAndDecodeResetToken} = require('../config/generateToken');
const mailer = require('../config/nodeMailer');
const jwt = require('jsonwebtoken')

//@desc RESET PASSWORD
//@route PUT /api/forgot
// @access Private
const forgot = asyncHandler(async (req, res) => {
    const utilisateur = await Utilisateur.findOne({ where: { email: req.body.email } });
    if(utilisateur) {
        const resetToken = generateResetToken(utilisateur.id);
        const resetLink = `http://localhost:3000/forgot/${resetToken}`;

        const contact =  {
            to: utilisateur.email,
            subject: `V.Bijouterie: Réinitialisation de mot de passe `,
            html: ` <p>Cliquez sur ce lien pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a></p>`
        }
        mailer(contact)
        res.status(200).json('Email envoyé avec succès.');
    }
    else {
        res.status(404);
        throw new Error('utilisateur introuvable')  
    }  
  });


//@desc RESET PASSWORD
//@route PUT /api/forgot/reset-password/:token
// @access Public
const reset = asyncHandler(async (req, res) => {
    const token = req.params.token;
    const password = req.body.password
    if (!password || password.length < 6) {
      res.status(400);
      throw new Error('mot de passe incorrect (min 6 caracteres).');
    }
    const userId = validateAndDecodeResetToken(token);
    if (!userId) {
      res.status(400);
      throw new Error('Token invalide.');
    }
    const utilisateur = await Utilisateur.findByPk(userId);
    try { 
      await Utilisateur.update({
        password: req.body.password ? await hashPassword(req.body.password) : utilisateur.password,
      },{where: {id: userId}})
      res.status(200).json({message: "mot de passe modifié"})
    } catch (error) {
        console.log(error)
        res.json({message: "error"})
    }
  });


  module.exports = {forgot, reset}
