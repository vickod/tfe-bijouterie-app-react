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
const mailer = require('../config/nodeMailer')


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
    
    const mailLivreur = await Utilisateur.findAll({where: {roleId: 3}})
    const mailAdmin = await Utilisateur.findOne({where: {roleId: 2}})

    console.log("voici le mail: "+mailLivreur.email)
    const premiereCommande = await Commande.findAll({
        where: {utilisateurId: utilisateur.id}
    })
    const premiereCommandeFlag = premiereCommande.length === 0;
    if(!prixTotale || prixTotale <=0) {
        res.status(400);
        throw new Error('prix erroné')
    }

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
                const majArticle = await ArticleTaille.findOne({where: { articleId: ligneDeCommande.articleId, tailleId: ligneDeCommande.tailleId }})
                const art = await Article.findOne({where: {id: majArticle.articleId}})
                const ta = await Taille.findOne({where: {id: majArticle.tailleId}})
                if(majArticle.stock<5 && majArticle.stock>0) {
                    const contact =  {
                        to: mailAdmin.email,
                        subject: `⚠️ l'article ${majArticle.articleId} sera bientot en rupture de stock! - V.Bijouterie`,
                        html: `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Alerte Stock Bas - V.Bijouterie</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    padding: 20px;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #fff;
                                    padding: 40px;
                                    border-radius: 10px;
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                    text-align: center;
                                }
                                h2 {
                                    color: #333;
                                }
                                p {
                                    color: #666;
                                    margin-bottom: 15px;
                                }
                                .warning {
                                    background-color: #ffecb3;
                                    padding: 10px;
                                    border-radius: 5px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h2>⚠️ Alerte Stock Bas !!! - V.Bijouterie</h2>
                                <div class="warning">
                                    <p>Le stock pour l'article ${majArticle.articleId}: ${art.nom} de taille: ${ta.taille} est presque épuisé. Veuillez vérifier et réapprovisionner au besoin.</p>
                                </div>
                                <p>Merci de prendre les mesures nécessaires.</p>
                            </div>
                        </body>
                        </html>
                        `
                      }
                      mailer(contact)
                }
                if(majArticle.stock === 0) {
                    const contact =  {
                        to: mailAdmin.email,
                        subject: `❗️❗️❗️ l'article ${majArticle.articleId} est en rupture de stock❗️❗️❗️ - V.Bijouterie`,
                        html: `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Alerte Stock Bas - V.Bijouterie</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    padding: 20px;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #fff;
                                    padding: 40px;
                                    border-radius: 10px;
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                    text-align: center;
                                }
                                h2 {
                                    color: #333;
                                }
                                p {
                                    color: #666;
                                    margin-bottom: 15px;
                                }
                                .warning {
                                    background-color: #ffecb3;
                                    padding: 10px;
                                    border-radius: 5px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h2>❗️❗️❗️ Stock épuisé !!! - V.Bijouterie</h2>
                                <div class="warning">
                                    <p>Le stock pour l'article ${majArticle.articleId}: ${art.nom} de taille: ${ta.taille} est épuisé ❗️. Veuillez vérifier et réapprovisionner au besoin.</p>
                                </div>
                                <p>Merci de prendre les mesures nécessaires.</p>
                            </div>
                        </body>
                        </html>
                        `
                      }
                      mailer(contact)
                }

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
            if (articles.length > 0) {
                const contact = {
                    to: utilisateur.email,
                    subject: `🛍️ Confirmation de votre commande - V.Bijouterie`,
                    html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Confirmation de Commande - V.Bijouterie</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #fff;
                                padding: 40px;
                                border-radius: 10px;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                text-align: center;
                            }
                            h2 {
                                color: #333;
                            }
                            p {
                                color: #666;
                                margin-bottom: 15px;
                            }
                            .table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-bottom: 20px;
                            }
                            .table th, .table td {
                                border: 1px solid #ddd;
                                padding: 8px;
                                text-align: left;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>Merci pour votre commande chez V.Bijouterie ! 🛍️</h2>
                            <p>Voici les détails de votre commande :</p>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>nom</th>
                                        <th>Quantité</th>
                                        <th>Taille</th>
                                        <th>Gravure</th>
                                        <th>Prix unitaire</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${articles.map(item => `
                                        <tr>
                                            <td>${item.nom}</td>              
                                            <td>${item.qty}</td>
                                            <td>${item.taille}</td>
                                            <td>
                                            <select>
                                            ${item.gravures.map(gravure => `
                                                <option value="${gravure}">${gravure}</option>
                                            `).join('')}
                                            </select>
                                            </td>
                                            <td>${item.prix}€</td>
                                            <td>${item.qty * item.prix}€</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                            <p>Total de la commande : ${prixTotale}€</p>
                            <p>Merci de votre confiance, et à bientôt sur V.Bijouterie !</p>
                        </div>
                    </body>
                    </html>
                    `
                };
                mailer(contact);
            }
            if(mailLivreur) {
                for(let i=0; i<mailLivreur.length; i++) {
                    const contactLivreur = {
                        to: mailLivreur[i].email, 
                        subject: 'Nouvelle commande à livrer - V.Bijouterie',
                        html: `
                          <!DOCTYPE html>
                          <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>Notification de livraison - V.Bijouterie</title>
                              <style>
                                  body {
                                      font-family: Arial, sans-serif;
                                      background-color: #f4f4f4;
                                      padding: 20px;
                                  }
                                  .container {
                                      max-width: 600px;
                                      margin: 0 auto;
                                      background-color: #fff;
                                      padding: 40px;
                                      border-radius: 10px;
                                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                      text-align: center;
                                  }
                                  h2 {
                                      color: #333;
                                  }
                                  p {
                                      color: #666;
                                      margin-bottom: 15px;
                                  }
                                  .warning {
                                      background-color: #ffecb3;
                                      padding: 10px;
                                      border-radius: 5px;
                                  }
                              </style>
                          </head>
                          <body>
                              <div class="container">
                                  <h2>⚠️ Nouvelle Commande à Livrer !!! - V.Bijouterie</h2>
                                  <div class="warning">
                                      <p>Une nouvelle commande a été passée et doit être préparée pour la livraison. Voici les informations :</p>
                                      <p>Numero de commande : ${nouvelleCommande.id}</p>
                                      <p>Nom du client : ${utilisateur.nom} ${utilisateur.prenom}</p>
                                      <p>Adresse de livraison : ${utilisateur.adresse}</p>
                                      <p>Téléphone : ${utilisateur.telephone}</p>
                                  </div>
                                  <p>Merci de procéder à la préparation et à la livraison de la commande.</p>
                              </div>
                          </body>
                          </html>
                        `
                      }
                    mailer(contactLivreur);
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





//@desc GET all commandes
//@route GET /api/commandes/livreur
//@access Private/livreur
const getCommandesLivreur = asyncHandler(async (req, res, next) => { 
    console.log("livreur is work!!!!!!!!")
    const commandes = await Commande.findAll({where: {isDelivered:false}});
    const utilisateurs = await Utilisateur.findAll();
    res.status(200).json({commandes, utilisateurs})
})



//@desc Update du status "delivré" de la commande
//@route PUT /api/commandes/:id/deliver/livreur
//@access Private/livreur
const updateCommandeToDeliveredLivreur = asyncHandler(async (req, res, next) => { 
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


module.exports = {
    addCommandes,
    getMesCommandes,
    getMaCommandeById,
    updateCommandeToPaid,
    updateCommandeToDelivered,
    getCommandes,

    getCommandesLivreur,
    updateCommandeToDeliveredLivreur,
}