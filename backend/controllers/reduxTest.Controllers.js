const asyncHandler = require('../middleware/asyncHandler');
const {Article, Selection, Categorie, Bague, Taille, GuideDeTailleArticle, TypeDePierre, TypeDeMatiere, Couleur, NbCarat, ArticleAvecPierre, BouclesDoreilles, BouclesDoreillesAvecPerle, CollierEtChaineAvecPerle ,CollierEtChaine, TypeDePerle, ArticleAvecPerle, ArticleTaille} = require('../dev-data/schema');


const reduxTest = asyncHandler(async (req, res, next) => {  
    const allArticles = await Article.findAll();
         console.log(allArticles)
      if(allArticles){
          res.json({
              articles:allArticles, 
          })
      }
      else {
          res.status(404);
          throw new Error("erreur au niveau de la route /articles")
      }
  })









module.exports={reduxTest}



