const asyncHandler = require('../middleware/asyncHandler');
const {Article, Selection, Categorie, Taille, GuideDeTailleArticle, TypeDePierre, TypeDeMatiere, Couleur, NbCarat, ArticleAvecPierre, BouclesDoreilles, BouclesDoreillesAvecPerle, CollierEtChaineAvecPerle ,CollierEtChaine, TypeDePerle, ArticleAvecPerle, ArticleTaille, Mesure} = require('../dev-data/schema');


//@desc Fetch all articles
//@route GET /api/articles
//@access Public
const getAllArticles = asyncHandler(async (req, res, next) => { 
  const selection = parseInt(req.query.selection);
  const categorie = req.query.categorie;
  const matiere = req.query.matiere;
  const carats = req.query.carats;
  const pierre = parseInt(req.query.pierre);
  const perle = parseInt(req.query.perle)
  const sort = req.query.sort

  // PUSH FILTER DATA
  const allCategorie = await Categorie.findAll()
  //const typeDeBague = await Bague.findAll()
  //const bouclesDoreilles = await BouclesDoreilles.findAll()
  //const colliers = await CollierEtChaine.findAll()
  const guideDeTailleArticle = await GuideDeTailleArticle.findAll()
  const taille = await Taille.findAll();
  const typeDePierres = await TypeDePierre.findAll()
  const typeDePerles = await TypeDePerle.findAll()
  const matieres = await TypeDeMatiere.findAll()
  // END OF PUSH FILTER DATA


  const filterOptions = {
      where:[],
      include: []
    };
    if(selection !== 0){
        filterOptions.where.push({
            selectionId: selection
        });
    }
    if(categorie !== "tous"){
        filterOptions.include.push({
        model: Categorie,
        where: { nom: categorie }
        });
    }
    if (matiere !== "tous") {
        filterOptions.include.push({
        model: TypeDeMatiere,
        where: { matiere: matiere }
        });
    }
    if (carats !== "tous") {
        filterOptions.include.push({
        model: NbCarat,
        where: { valeur: carats }
        });
    }
    if (pierre !== 0) {
        filterOptions.include.push({
            model: ArticleAvecPierre,
                where: {typeDePierreId: pierre}
            
        });
    }  
    if(perle !== 0){
        filterOptions.include.push({
            model: ArticleAvecPerle, 
            where: {typeDePerleId: perle}
         },
        );
    }
    if (sort === "croissant") {
              filterOptions.order = [
                  ['prix', 'ASC'] // Tri croissant sur le prix
              ];
    } else if (sort === "decroissant") {
              filterOptions.order = [
                  ['prix', 'DESC'] // Tri décroissant sur le prix
              ];
          }
    
    const allArticles = await Article.findAll(filterOptions);

    if(allArticles){
        res.json({
            articles:allArticles, 
            categories: allCategorie,
            //bagues:typeDeBague,
            //bouclesDoreilles: bouclesDoreilles,
            //colliers: colliers,
            guideDeTailleArticle,
            taille,
            carats,
            typeDePierres,
            typeDePerles,
            matieres
        })
    }
    else {
        res.status(404);
        throw new Error("erreur au niveau de la route /articles")
    }
})

//@desc Fetch list of articles
//@route GET /api/articles/list
//@access private/admin
const getArticlesList = asyncHandler(async (req, res, next) => {
    const articles = await Article.findAll()
    const tailles = await Taille.findAll()
    const selections = await Selection.findAll()
    const categories = await Categorie.findAll()
    const articlesTailles = await ArticleTaille.findAll()

    if(articles){
        res.json({
            articles,
            tailles,
            selections,
            categories,
            articlesTailles,
        })
    }
    else {
        res.status(404);
        throw new Error("erreur au niveau de la route articles/list")
    }
})

//@desc create articles
//@route POST /api/articles
//@access private/admin
const createArticle = asyncHandler(async (req, res, next) => {
    const article = await Article.create({
        nom : "nouvel article",
        type:"",
        prix: 0, 
        message: "description",
        image: 'aucune image',
    })
    if(article){
        res.json({
            article,
        })
    }
    else {
        res.status(404);
        throw new Error("erreur au niveau de la route articles/list")
    }
})

//@desc update articles
//@route PUT /api/articles/:id
//@access private/admin
const updateArticle = asyncHandler(async (req, res, next) => {
    const {
        nom, 
        prix,
        type, 
        message, 
        image, 
        categorie, 
        selection, 
        matiere, 
        carats, 
    } = req.body;
    
    const article = await Article.findByPk(req.params.id);
    const categorieId = await Categorie.findOne({where: {nom: categorie}});
    const selectionId = await Selection.findOne({where: {nom: selection}})
    const matiereId = await TypeDeMatiere.findOne({where: {matiere: matiere}})
    const caratId = await NbCarat.findOne({where: {valeur: carats}})
  

    let updatedArticle;
   if(article){
       console.log("voici l'article :"+nom)
       updatedArticle = await Article.update(
            {
            nom: nom || article.nom,
            type: type || article.type,
            prix: prix || article.prix,
            message: message || article.message,
            image: image || article.image,
            categorieId: categorieId.id || article.categorieId,
            selectionId: selectionId.id || article.selectionId,
            typeDeMatiereId: matiereId.id || article.matiereId,
            nbCaratId: caratId.id || article.caratId,
            },
            {where: {id: req.params.id}},
        )
        res.json(updatedArticle)
    }
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})



const ajoutDeTaille = asyncHandler(async (req, res, next) => {
    const { 
        addTaille,
        tailleId,
        poids,
        diametre,
        longeur,
        largeur,
        epaisseur, 
    } = req.body;
    const taille = await Taille.findOne({where:{taille: addTaille}})
    const article = await Article.findByPk(req.params.id);
   

   if(article){
        if(taille) {
            await ArticleTaille.create(
                {
                    stock: 0,
                    articleId: req.params.id,
                    tailleId: taille.id
                },
            )
            if(poids) {
                await GuideDeTailleArticle.create(
                    {
                        valeur_mesure: poids,
                        unite_mesure: 'g',
                        articleId: req.params.id,
                        mesureId: 1,
                        tailleId: taille.id
                    },
                )
            }
            if(diametre) {
                await GuideDeTailleArticle.create(
                    {
                        valeur_mesure: diametre,
                        unite_mesure: 'mm',
                        articleId: req.params.id,
                        mesureId: 2,
                        tailleId: taille.id
                    },
                )
            }
            if(longeur) {
                await GuideDeTailleArticle.create(
                    {
                        valeur_mesure: longeur,
                        unite_mesure: 'mm',
                        articleId: req.params.id,
                        mesureId: 3,
                        tailleId: taille.id
                    },
                )
            }
            if(largeur) {
                await GuideDeTailleArticle.create(
                    {
                        valeur_mesure: largeur,
                        unite_mesure: 'mm',
                        articleId: req.params.id,
                        mesureId: 4,
                        tailleId: taille.id
                    },
                )
            }
            if(epaisseur) {
                await GuideDeTailleArticle.create(
                    {
                        valeur_mesure: epaisseur,
                        unite_mesure: 'mm',
                        articleId: req.params.id,
                        mesureId: 5,
                        tailleId: taille.id
                    },
                )
            }
            res.json(taille)
            
        } else {

            const newTaille = await Taille.create(
                {
                taille: addTaille
                },
        )
        await ArticleTaille.create(
            {
                stock: 0,
                articleId: req.params.id,
                tailleId: newTaille.id
            },
        )
        if(poids) {
            await GuideDeTailleArticle.create(
                {
                    valeur_mesure: poids,
                    unite_mesure: 'g',
                    articleId: req.params.id,
                    mesureId: 1,
                    tailleId: newTaille.id
                },
            )
        }
        if(diametre) {
            await GuideDeTailleArticle.create(
                {
                    valeur_mesure: diametre,
                    unite_mesure: 'mm',
                    articleId: req.params.id,
                    mesureId: 2,
                    tailleId: newTaille.id
                },
            )
        }
        if(longeur) {
            await GuideDeTailleArticle.create(
                {
                    valeur_mesure: longeur,
                    unite_mesure: 'mm',
                    articleId: req.params.id,
                    mesureId: 3,
                    tailleId: newTaille.id
                },
            )
        }
        if(largeur) {
            await GuideDeTailleArticle.create(
                {
                    valeur_mesure: largeur,
                    unite_mesure: 'mm',
                    articleId: req.params.id,
                    mesureId: 4,
                    tailleId: newTaille.id
                },
            )
        }
        if(epaisseur) {
            await GuideDeTailleArticle.create(
                {
                    valeur_mesure: epaisseur,
                    unite_mesure: 'mm',
                    articleId: req.params.id,
                    mesureId: 5,
                    tailleId: newTaille.id
                },
            )
        }
        res.json(newTaille)
        }
        
        
    }  
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})




const supprimerTaille = asyncHandler(async (req, res, next) => {
    const { 
        supprimerTaille,
    } = req.body;
    
    const article = await Article.findByPk(req.params.id);

   if(article){     
        const deletedTaille = await GuideDeTailleArticle.destroy(
            {
                where: {articleId: req.params.id, tailleId: supprimerTaille}
            },
        )
        await ArticleTaille.destroy(
            {
                where: {articleId: req.params.id, tailleId: supprimerTaille}
            },
        )    
        // await Taille.destroy(
        //     {
        //         where: {id: supprimerTaille}
        //     },
        // )    
        res.json(deletedTaille)
    }  
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})


const modifierStock = asyncHandler(async (req, res, next) => {
    const { 
        tailleId,
        stock, 
    } = req.body;
    
    const article = await Article.findByPk(req.params.id);

   if(article){     
        const articleStock = await ArticleTaille.update(
            {
                stock: stock
            },
            {
                where: {articleId: req.params.id, tailleId: tailleId}
            },
        )
        res.json(articleStock)
    }  
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})





const modifierPierre = asyncHandler(async (req, res, next) => {
    const article = await Article.findByPk(req.params.id);
    const { 
        typeDePierre,
        nbPierres,
        couleurPierre,
        nbCtPierres
    } = req.body;
     
   if(article){
        const pierre = await TypeDePierre.findOne({ where: { nom: typeDePierre } });
        const couleur = await Couleur.findOne({ where: { nom: couleurPierre } });
        const existeDeja = await pierre.hasCouleur(couleur);
        if (!existeDeja) {
            await pierre.addCouleur(couleur);
        } 
        const createPierre = await ArticleAvecPierre.create({
            nbPierres: nbPierres,
            nbCarats: nbCtPierres,
            articleId: req.params.id,
            typeDePierreId: pierre.id,
            couleurId: couleur.id
        })  
        
        console.log("OK")
        console.log(createPierre)
        res.json("OK")
    }  
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})

const modifierPerle = asyncHandler(async (req, res, next) => {
    const article = await Article.findByPk(req.params.id);
    const { 
        typeDePerle,
        nbPerles,
        couleurPerle,
    } = req.body;
     
   if(article){
        const perle = await TypeDePerle.findOne({ where: { type: typeDePerle } });
        //const existPerle = await ArticleAvecPerle.findAll()
        const couleur = await Couleur.findOne({ where: { nom: couleurPerle } });
        const existeDeja = await perle.hasCouleur(couleur);
        if (!existeDeja) {
            await perle.addCouleur(couleur);
        } 
        // if (!existeDeja) {
        //     await perle.addCouleur(couleur);
        // } 
        const createPerle = await ArticleAvecPerle.create({
            nbPerles: nbPerles,
            articleId: req.params.id,
            typeDePerleId: perle.id,
            couleurId: couleur.id
        })  
        res.json("OK")
    }  
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})


const supprimerPierre = asyncHandler(async (req, res, next) => {
    const { 
        supprimerPierre,
    } = req.body;
    const article = await Article.findByPk(req.params.id);

   if(article){     
        const deletePierre = await ArticleAvecPierre.destroy(
            {
                where: {articleId: req.params.id, typeDePierreId: supprimerPierre}
            },
        )
        res.json(deletePierre)
    }  
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})

const supprimerPerle = asyncHandler(async (req, res, next) => {
    const { 
        supprimerPerle,
    } = req.body;
    const article = await Article.findByPk(req.params.id);

   if(article){     
        const deletePerle = await ArticleAvecPerle.destroy(
            {
                where: {articleId: req.params.id, typeDePerleId: supprimerPerle}
            },
        )
        res.json(deletePerle)
    }  
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})






//@desc Delete articles
//@route DELETE /api/articles/:id
//@access private/admin
const deleteArticle = asyncHandler(async (req, res, next) => {
    
    const article = await Article.findByPk(req.params.id);
    const guideDeTailleArticle = await GuideDeTailleArticle.findAll({where: {articleId:req.params.id}})
    const articleAvecPerle = await ArticleAvecPerle.findAll({where: {articleId: req.params.id}})
    const articleAvecPierre = await ArticleAvecPierre.findAll({where: {articleId: req.params.id}})
    const articleTaille = await ArticleTaille.findAll({where: {articleId: req.params.id}})


   if(article){
       if(guideDeTailleArticle) {
        await GuideDeTailleArticle.destroy({
            where: {articleId: req.params.id}
           })
       }
       if(articleAvecPerle) {
        await ArticleAvecPerle.destroy({
            where: {articleId: req.params.id}
           })
       }
       if(articleAvecPierre) {
        await ArticleAvecPierre.destroy({
            where: {articleId: req.params.id}
           })
       }
       if(articleTaille) {
        await ArticleTaille.destroy({
            where: {articleId: req.params.id}
           })
       }
       await Article.destroy({
        where: {id: req.params.id}
       })
       res.status(200).json({message: "article supprimé"})
        //res.json(updatedArticle)
    }
    else {
        res.status(404);
        throw new Error("l'article n'a pas pu se mettre a jour")
    }
})




//@desc Fetch one article
//@route GET /api/articles/:id
//@access Public
const getOneArticle = asyncHandler(async (req, res, next) => {
    const articleId = req.params.id;
    const article =  await Article.findByPk(articleId)

    const articlesTailles = await Article.findByPk(articleId, {
        include: Taille,
      });
    const articleStock = await ArticleTaille.findAll({
        where: {articleId: articleId},
    })
    const tailles = articlesTailles.tailles.map((taille) => taille.toJSON());
    
    const categories = await Categorie.findAll();
    const selections = await Selection. findAll();
    const matieres = await TypeDeMatiere.findAll();
    const carats = await NbCarat.findAll();
    const couleurs = await Couleur.findAll();
    const pierres = await TypeDePierre.findAll();
    const perles = await TypeDePerle.findAll();
    const mesures = await Mesure.findAll();
    const articlesAvecPierre = await ArticleAvecPierre.findAll();
    const articlesAvecPerle = await ArticleAvecPerle.findAll();
    const guideDeTailleArticle = await GuideDeTailleArticle.findAll();

    if(article){
        res.json({
            article,
            tailles,
            articlesTailles,
            articleStock,
            categories,
            selections,
            matieres,
            carats,
            couleurs,
            pierres,
            perles,
            mesures,
            articlesAvecPerle,
            articlesAvecPierre,
            guideDeTailleArticle,
        })
    }
    else {
        res.status(404);
        throw new Error("erreur au niveau de la route article/:id")
    }
})







module.exports={
    getAllArticles, 
    getOneArticle, 
    getArticlesList, 
    createArticle, 
    updateArticle, 
    ajoutDeTaille, 
    supprimerTaille, 
    modifierStock,
    deleteArticle,
    modifierPierre,
    modifierPerle,
    supprimerPierre,
    supprimerPerle
}



