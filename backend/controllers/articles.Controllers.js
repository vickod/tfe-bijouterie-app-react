const asyncHandler = require('../middleware/asyncHandler');
const {Article, Selection, Categorie, Bague, Taille, GuideDeTailleArticle, TypeDePierre, TypeDeMatiere, Couleur, NbCarat, ArticleAvecPierre} = require('../dev-data/schema')

//@desc Fetch all articles
//@route GET /api/articles
//@access Public

const getAllArticles = asyncHandler(async (req, res, next)=>{
    const allArticles = await Article.findAll() 
    
    if(allArticles){
        res.json(allArticles)
    }
    else {
        res.status(404);
        throw new Error("erreur au niveau de la route /articles")
    }
})

//@desc Fetch one article
//@route GET /api/articles/:id
//@access Public
const getOneArticle = asyncHandler(async (req, res, next)=>{
    
    const article =  await Article.findByPk(req.params.id)
    
    if(article){
        res.json(article)
    }
    else {
        res.status(404);
        throw new Error("erreur au niveau de la route article/:id")
    }
})

module.exports={getAllArticles, getOneArticle}



