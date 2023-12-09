const express = require('express')
const router = express.Router()
const {forgot, reset} = require('../controllers/resetPassword.Controllers');
const {protect, client, admin} = require('../middleware/authMiddleware');


    router.route('/')
    .post(forgot)

    //router.route('/id:/:token').get(reset);

    router.route('/:token').put(reset);


    module.exports = router

    