const Selection = require('../models/selectionModel')
const Categorie = require('../models/categorieModel')
const Article = require('../models/articleModel')
const Utilisateur = require('../models/utilisateurModel')
const Role = require('../models/roleModel')
const Commande = require('../models/commandeModel')
const LigneDeCommande = require('../models/ligneDeCommadeModel')
const Gravure = require('../models/gravureModel')
const Taille = require('../models/tailleModel')
const ArticleTaille = require('../models/articleTailleModel')
const Couleur = require('../models/couleurModel')
const NbCarat = require('../models/nbCaratModel')
const TypeDePierre = require('../models/typeDePierreModel')
const ArticleAvecPierre = require('../models/articleAvecPierreModel')
const TypeDeMatiere = require('../models/typeDeMatiereModel')
const TypeDePerle = require('../models/typeDePerleModel')
const Mesure = require('../models/mesureModel')
const GuideDeTailleArticle = require('../models/guideDeTailleArticleModel')
const ArticleAvecPerle = require('../models/articleAvecPerleModel')

// selection - categorie
Selection.belongsToMany(Categorie, { through: 'selectionCategorie' ,timestamps: false }) 
Categorie.belongsToMany(Selection, { through: 'selectionCategorie' ,timestamps: false })

// article - categorie
Categorie.hasMany(Article) 
Article.belongsTo(Categorie) 

// selection - articles
Selection.hasMany(Article)
Article.belongsTo(Selection) 

//utilisateur - role
Role.hasMany(Utilisateur) 
Utilisateur.belongsTo(Role)

//utilisateur - commande
Utilisateur.hasMany(Commande)
Commande.belongsTo(Utilisateur)

//commande - ligne de commande
Commande.hasMany(LigneDeCommande)
LigneDeCommande.belongsTo(Commande)

LigneDeCommande.hasOne(Gravure)
Gravure.belongsTo(LigneDeCommande)

//gravure - utilisateur
Utilisateur.hasMany(Gravure)
Gravure.belongsTo(Utilisateur)

//ligne de commande - selection
Selection.hasMany(LigneDeCommande)
LigneDeCommande.belongsTo(Selection)

//ligne de commande - article
Article.hasMany(LigneDeCommande)
LigneDeCommande.belongsTo(Article)

//ligne de commande - taille
Taille.hasMany(LigneDeCommande)
LigneDeCommande.belongsTo(Taille)


// article - taille (model: articleTaille comprend le stock)
Article.belongsToMany(Taille, { through: 'articleTaille' ,timestamps: false })
Taille.belongsToMany(Article, { through: 'articleTaille' ,timestamps: false })

//type de matiere - article 
TypeDeMatiere.hasMany(Article)
Article.belongsTo(TypeDeMatiere)

//type de matiere - nombre de carats
// TypeDeMatiere.belongsToMany(NbCarat, { through: 'typeDeMatiereNbCarat', timestamps: false })
// NbCarat.belongsToMany(TypeDeMatiere, { through: 'typeDeMatiereNbCarat', timestamps: false })

//type de matiere - couleur
// TypeDeMatiere.belongsToMany(Couleur, { through: 'typeDeMatiereCouleur' ,timestamps: false })
// Couleur.belongsToMany(TypeDeMatiere, { through: 'typeDeMatiereCouleur' ,timestamps: false })

//Nombre de carats - Article
NbCarat.hasMany(Article)
Article.belongsTo(NbCarat)

//Nombre de carats - Type de pierre 
// NbCarat.belongsToMany(TypeDePierre, { through: 'typeDePierreNbCarat' ,timestamps: false })
// TypeDePierre.belongsToMany(NbCarat, { through: 'typeDePierreNbCarat' ,timestamps: false })

//Type de pierre - Couleur
TypeDePierre.belongsToMany(Couleur, { through: 'typeDePierreCouleur' ,timestamps: false })
Couleur.belongsToMany(TypeDePierre, { through: 'typeDePierreCouleur' ,timestamps: false })

//Couleur - Article
// Article.belongsToMany(Couleur, { through: 'articleCouleur' ,timestamps: false })
// Couleur.belongsToMany(Article, { through: 'articleCouleur' ,timestamps: false })

//Type de perle - Couleur
TypeDePerle.belongsToMany(Couleur, { through: 'typeDePerleCouleur' ,timestamps: false })
Couleur.belongsToMany(TypeDePerle, { through: 'typeDePerleCouleur' ,timestamps: false })

//N-AIR ArticleAvecPierre: article - nbCt - nbPierres - typeDePierre - couleur 
Article.hasMany(ArticleAvecPierre);
TypeDePierre.hasMany(ArticleAvecPierre);
Couleur.hasMany(ArticleAvecPierre);
//NbCarat.hasMany(ArticleAvecPierre);
ArticleAvecPierre.belongsTo(TypeDePierre)
ArticleAvecPierre.belongsTo(Article)
ArticleAvecPierre.belongsTo(Couleur)
//ArticleAvecPierre.belongsTo(NbCarat)

//N-AIR: GuideDeTailleArticle: article - taille - mesure  
Article.hasMany(GuideDeTailleArticle);
Mesure.hasMany(GuideDeTailleArticle);
Taille.hasMany(GuideDeTailleArticle);
GuideDeTailleArticle.belongsTo(Article);
GuideDeTailleArticle.belongsTo(Mesure);
GuideDeTailleArticle.belongsTo(Taille);



Article.hasMany(ArticleAvecPerle);
TypeDePerle.hasMany(ArticleAvecPerle);
Couleur.hasMany(ArticleAvecPerle);
ArticleAvecPerle.belongsTo(Article);
ArticleAvecPerle.belongsTo(TypeDePerle);
ArticleAvecPerle.belongsTo(Couleur);



module.exports = {
    Selection, 
    Categorie, 
    Article, 
    Utilisateur, 
    Role, 
    Commande, 
    LigneDeCommande, 
    Taille,
    ArticleTaille,
    Couleur,
    TypeDePierre,
    NbCarat,
    ArticleAvecPierre,
    TypeDeMatiere,
    TypeDePerle,
    Mesure,
    GuideDeTailleArticle,
    ArticleAvecPerle,
    Gravure,
}