const asyncHandler = require('../middleware/asyncHandler');
const {Article, Selection, Categorie, Bague, Taille, GuideDeTailleArticle, TypeDePierre, TypeDeMatiere, Couleur, NbCarat, ArticleAvecPierre, BouclesDoreilles, BouclesDoreillesAvecPerle, CollierEtChaineAvecPerle ,CollierEtChaine, TypeDePerle, ArticleAvecPerle} = require('../dev-data/schema');


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
  const typeDeBague = await Bague.findAll()
  const bouclesDoreilles = await BouclesDoreilles.findAll()
  const colliers = await CollierEtChaine.findAll()
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
    
      console.log(perle)
    const allArticles = await Article.findAll(filterOptions);
    
    
      



    
//     if (selectedTypeBague !== "tous") {
//       filterOptions.include.push({
//         model: Bague,
//         where: { type: selectedTypeBague }
//       });
//     }
    
//     if (selectedTailleBague !== "tous") {
//       filterOptions.include.push({
//         model: Taille,
//         where: { taille: selectedTailleBague }
//       });
//     }
//     if (selectedMatiere !== "tous") {
//       filterOptions.include.push({
//         model: TypeDeMatiere,
//         where: { matiere: selectedMatiere}
//       });
//     }
//     if (selectedCt !== "tous") {
//       filterOptions.include.push({
//         model: NbCarat,
//         where: { valeur: selectedCt}
//       });
//     }
    
//     if (selectedPierre !== "tous") {
//       filterOptions.include.push({
//           model: ArticleAvecPierre,
//           where: { typeDePierreId: getPierre.id },   
//       });
//   }
  
//   if (selectedSort === "croissant") {
//       filterOptions.order = [
//           ['prix', 'ASC'] // Tri croissant sur le prix
//       ];
//   } else if (selectedSort === "decroissant") {
//       filterOptions.order = [
//           ['prix', 'DESC'] // Tri décroissant sur le prix
//       ];
//   }
  

    // Calcul de la pagination
    //const itemsPerPage = 2;
    //const offset = (page - 1) * itemsPerPage;

    // Appliquer les options de filtre et de pagination à la requête
    //filterOptions.offset = offset;
    //filterOptions.limit = itemsPerPage;

   
     
   // Récupérer le nombre total d'articles non paginés
   //const totalArticles = await Article.count(filterOptions);

   // Calculer le nombre total de pages
   //const totalPages = Math.ceil(totalArticles / itemsPerPage);

        
    if(allArticles){
        res.json({
            articles:allArticles, 
            categories: allCategorie,
            bagues:typeDeBague,
            bouclesDoreilles: bouclesDoreilles,
            colliers: colliers,
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



