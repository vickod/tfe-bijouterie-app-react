const express = require('express')
const router = express.Router()
const {authUser,
    registerUser,
    logoutUser,
    getUsers,
    getUserProfile,
    updateUser,
    updateUserProfile,
    deleteUser,
    getUserById,

} = require('../controllers/utilisateur.Controllers');
const {protect, admin} = require('../middleware/authMiddleware');







    router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);

    router.post('/logout', logoutUser)

    router.post('/login', authUser)


    router.route('/profile')
    .get(protect,getUserProfile)
    .put(protect,updateUserProfile);

    router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)


  



    module.exports = router