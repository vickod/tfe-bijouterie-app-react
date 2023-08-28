const express = require('express')
const router = express.Router()
const { getAllArticles, getOneArticle} = require('../controllers/articles.Controllers')



router.route('/')
.get(getAllArticles);


router.route('/:id')
.get(getOneArticle);





module.exports = router