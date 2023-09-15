const express = require('express')
const router = express.Router()
const  {
    addCommandes,
    getMesCommandes,
    getMaCommandeById,
    updateCommandeToPaid,
    updateCommandeToDelivered,
    getCommandes
} = require('../controllers/commandes.Controllers');
const {protect, admin} = require('../middleware/authMiddleware');



router.route('/')
.post(protect,addCommandes)
.get(protect, admin, getCommandes);

router.route('/mes_commandes')
.get(protect, getMesCommandes)

router.route('/:id')
.get(protect, getMaCommandeById)


router.route('/:id/pay')
.put(protect, updateCommandeToPaid)

router.route('/:id/deliver')
.put(protect, admin, updateCommandeToDelivered)




module.exports = router