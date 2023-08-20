const asyncHandler = require('../middleware/asyncHandler');
const {Article, Selection, Categorie, Bague, Taille, GuideDeTailleArticle, TypeDePierre, TypeDeMatiere, Couleur, NbCarat, ArticleAvecPierre} = require('../dev-data/schema')

//@desc Fetch all articles
//@route GET /api/articles
//@access Public
const getAllArticles = asyncHandler(async (req, res, next) => { 
  const selection = parseInt(req.query.selectionId)
  
  const allCategorie = await Categorie.findAll()
  const typeDeBague = await Bague.findAll()
    let allArticles;

    if(selection === 0){
      allArticles = await Article.findAll() 
    }

    if(selection === 1 || selection === 2) {
       allArticles = await Article.findAll({
        where: {selectionId: selection}
       }) 
    }

    if(allArticles){
        res.json({
            articles:allArticles, 
            categories: allCategorie,
            bagues:typeDeBague,

        })
    }
    else {
        res.status(404);
        throw new Error("erreur au niveau de la route /articles")
    }
})

//@desc Fetch one article
//@route GET /api/articles/:id
//@access Public
const getOneArticle = asyncHandler(async (req, res, next) => {
    
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



