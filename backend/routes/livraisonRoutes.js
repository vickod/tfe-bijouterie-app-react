const express = require('express')
const router = express.Router()
const  {
    getCommandesLivreur,
    updateCommandeToDeliveredLivreur,
} = require('../controllers/commandes.Controllers');
const {protect, livreur} = require('../middleware/authMiddleware');



router.route('/')
.get(protect, livreur, getCommandesLivreur);


router.route('/:id/deliver/livreur')
.put(protect, livreur, updateCommandeToDeliveredLivreur)


module.exports = router