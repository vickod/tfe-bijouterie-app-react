const express = require('express')
const router = express.Router()
const { getAllArticles, getOneArticle, getArticlesList, createArticle, updateArticle, ajoutDeTaille, supprimerTaille, modifierStock, deleteArticle} = require('../controllers/articles.Controllers')
const {protect, admin} = require('../middleware/authMiddleware');



router.route('/')
.get(getAllArticles);

router.route('/list')
.get(protect, admin, getArticlesList);

router.route('/:id')
.get(getOneArticle);

router.route('/')
.post(protect, admin, createArticle);

router.route('/:id/edit')
.put(protect, admin, updateArticle);

router.route('/:id/addTaille')
.put(protect, admin, ajoutDeTaille);

router.route('/:id/deleteTaille')
.put(protect, admin, supprimerTaille);

router.route('/:id/modifStock')
.put(protect, admin, modifierStock);


router.route('/:id/deleteArticle')
.delete(protect, admin, deleteArticle);



module.exports = router