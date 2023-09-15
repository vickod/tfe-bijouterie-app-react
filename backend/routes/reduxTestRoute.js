const express = require('express')
const router = express.Router()
const {reduxTest} = require('../controllers/reduxTest.Controllers')



//redux test
router.route('/')
.get(reduxTest)



module.exports = router