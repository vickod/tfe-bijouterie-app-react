const asyncHandler = require('../middleware/asyncHandler');
const {
    Commande,
    Article, 
    Selection, 
    Categorie, 
    Bague, 
    Taille, 
    GuideDeTailleArticle, 
    TypeDePierre, 
    TypeDeMatiere, 
    Couleur, 
    NbCarat, 
    ArticleAvecPierre, 
    BouclesDoreilles, 
    BouclesDoreillesAvecPerle, 
    CollierEtChaineAvecPerle ,
    CollierEtChaine, 
    TypeDePerle, 
    ArticleAvecPerle, 
    ArticleTaille,
    Gravure,
    LigneDeCommande,
    Utilisateur} = require('../dev-data/schema');
const { where , literal} = require('sequelize');



//@desc add new commande
//@route POST /api/commande
//@access Private
const addCommandes = asyncHandler(async (req, res, next) => { 
    const {
        articles,
        utilisateur,
        prixTotale,
        methodeDePayement,
    } = req.body
    console.log(articles)
    const premiereCommande = await Commande.findAll({
        where: {utilisateurId: utilisateur.id}
    })
    const premiereCommandeFlag = premiereCommande.length === 0;

    if(articles && articles.length === 0) {
        res.status(400);
        throw new Error('aucune commande')
    }else {    
            const nouvelleCommande = await Commande.create({
              orderAt: new Date(),
              total: prixTotale,
              isPaid: true,
              paidAt: new Date(), 
              isDelivered: false, 
              deliveredAt: null,
              methodeDePayement: methodeDePayement,
              premiereCommande: premiereCommandeFlag,
              utilisateurId: utilisateur.id, 
            });
            const commandeId = nouvelleCommande.id; 
            
            for (const article of articles) {            
                const ligneDeCommande = await LigneDeCommande.create({
                    quantite: article.qty,
                    prix: article.prix,
                    commandeId,
                    selectionId: article.selectionId,
                    articleId: article.id,
                    tailleId: article.tailleId,
                });
                const stock = await ArticleTaille.findOne({where: { articleId: ligneDeCommande.articleId, tailleId: ligneDeCommande.tailleId }})
                const qtyArticles = ligneDeCommande.quantite;
                const disponible = stock.stock-qtyArticles;
                const majStock = await ArticleTaille.update(
                { stock: disponible}, 
                { where: { articleId: ligneDeCommande.articleId, tailleId: ligneDeCommande.tailleId } }
                );

                if (article.gravures.length>0) {
                    for(const gravure of article.gravures){
                        await Gravure.create({
                            message: gravure,
                            ligneDeCommandeId: ligneDeCommande.id,
                            utilisateurId: utilisateur.id, 
                          });
                    }
                 }
            }       
        res.status(201).json(nouvelleCommande)
    }
})


//@desc get mes commandes
//@route GET /api/commandes/mes_commandes
//@access Private
const getMesCommandes = asyncHandler(async (req, res, next) => { 
    const commandes = await Commande.findAll({
          where: {utilisateurId: req.utilisateur.id}
    });
    res.status(200).json(commandes)
});

//@desc get ma commande by id
//@route GET /api/commandes/:id
//@access Private
const getMaCommandeById = asyncHandler(async (req, res, next) => { 
    const commande = await Commande.findByPk(req.params.id)
    const gravures = await Gravure.findAll({})
    const utilisateur = await Utilisateur.findByPk(commande.utilisateurId)
    const ligneDeCommande = await LigneDeCommande.findAll({
        where:{commandeId: commande.id}
    })
    const articles = await Article.findAll();
    const tailles = await Taille.findAll();

    if(commande) {
        res.status(200).json({
            commande,
            gravures,
            utilisateur,
            ligneDeCommande,
            articles,
            tailles, 
        })
    }else {
        res.status(404);
        throw new Error(`Aucun commande trouvé avec l'ID : ${req.params.id}`)
    }
})



//@desc Update du status "payé" de ma commande
//@route PUT /api/commandes/:id/pay
//@access Private
const updateCommandeToPaid = asyncHandler(async (req, res, next) => { 
     const commande = await Commande.findByPk(req.params.id)
     if(commande) {
        await Commande.update({
            isPaid: true,
            paidAt: Date.now(),
        },
        {where: {id: commande.id}}
        )
        res.status(200).json(commande)
     }else {
        res.status(404);
        throw new Error('Aucune commande trouvée')
     }

  })

//@desc Update du status "delivré" de la commande
//@route PUT /api/commandes/:id/deliver
//@access Private/Admin
const updateCommandeToDelivered = asyncHandler(async (req, res, next) => { 
    const commande = await Commande.findByPk(req.params.id);
    if(commande) {
        const updatedCommande = await Commande.update({
            isDelivered:true ,  deliveredAt:Date.now(),
        },
        {where:{id: commande.id}}
        )
        console.log(updatedCommande)
        res.status(200).json(updatedCommande)
    }else {
        res.status(404);
        throw new Error('commande not found')
    }
})


//@desc GET all commandes
//@route GET /api/commandes
//@access Private/Admin
const getCommandes = asyncHandler(async (req, res, next) => { 
    const commandes = await Commande.findAll();
    const utilisateurs = await Utilisateur.findAll();
    res.status(200).json({commandes, utilisateurs})
})


module.exports = {
    addCommandes,
    getMesCommandes,
    getMaCommandeById,
    updateCommandeToPaid,
    updateCommandeToDelivered,
    getCommandes
}