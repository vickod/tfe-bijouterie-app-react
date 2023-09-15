const {
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
    Gravure,
    ArticleAvecPerle
} = require('./schema')
const sequelize = require('../config/db_connection')
const { hashPassword, comparePasswords } = require('../config/password_hash');

(async()=>{
    try {
        await sequelize.sync({force: true}) 
    
    //Creations des selections
    const hommes = await Selection.create({
        nom: "Homme",
    });
    const femmes = await Selection.create({
        nom: "Femmes",
    });
    //Creations des categories
     const categorieBagues = await Categorie.create({
        nom: "bagues",
    });
    const categorieBouclesDoreilles = await Categorie.create({
        nom: "Boucles d'oreilles",
    });
    const categorieCollier = await Categorie.create({
        nom: "Colliers et chaines",
    });
   
    //Selection - categorie
    await hommes.addCategorie(categorieBagues)
    await hommes.addCategorie(categorieCollier)
    await hommes.addCategorie(categorieBouclesDoreilles)
  

    await femmes.addCategorie(categorieBagues)
    await femmes.addCategorie(categorieBouclesDoreilles)
    await femmes.addCategorie(categorieCollier)
 

    //Creations des roles
    const client = await Role.create({
        role: "client",
    });
    const manager = await Role.create({
        role: "manager",
    });
    //Creation des Utilisateurs
    
    const pierre = await Utilisateur.create({
        nom: "moro",
        prenom: "pierre",
        email:"pierre@mail.com",
        telephone: "0499568322",
        adresse: "chaussée de wavre 40",
        password: await hashPassword("password"),
        roleId: client.id
    });
    const victor = await Utilisateur.create({
        nom: "Tor",
        prenom: "Vick",
        email:"victor@mail.com",
        telephone: "0483245599",
        adresse: "avenue de l'elite 33",
        password: await hashPassword("password"),
        roleId: manager.id
    });
    const alice = await Utilisateur.create({
        nom: "arilo",
        prenom: "alice",
        email:"alice@mail.com",
        telephone: "0493227748",
        adresse: "rue des arts 12",
        password: await hashPassword("password"),
        roleId: client.id
    });
    const benkeder = await Utilisateur.create({
        nom: "benkeder",
        prenom: "naceur",
        email:"benkeder@mail.com",
        telephone: "0485908734",
        adresse: "rue de marie 109",
        password: await hashPassword("password"),
        roleId: client.id
    });
    const celine = await Utilisateur.create({
        nom: "lore",
        prenom: "celine",
        email:"celine@mail.com",
        telephone: "0466893455",
        adresse: "rue de la ville 56",
        password: await hashPassword("password"),
        roleId: client.id
    });
    const marie = await Utilisateur.create({
        nom: "dano",
        prenom: "Marie",
        email:"marie@mail.com",
        telephone: "0479335599",
        adresse: "avenue de la paix 500",
        password: await hashPassword("password"),
        roleId: client.id
    });
    const jean = await Utilisateur.create({
        nom: "lemans",
        prenom: "Jean",
        email:"jean@mail.com",
        telephone: "0475225575",
        adresse: "rue saint-pierre 60",
        password: await hashPassword("password"),
        roleId: client.id
    });

    // creation de couleur
     const rose = await Couleur.create({
        nom: "rose",
    });
    const jaune = await Couleur.create({
        nom: "jaune",
    });
    const rouge = await Couleur.create({
        nom: "rouge",
    });
    const blanc = await Couleur.create({
        nom: "blanc",
    });
    const couleurArgent = await Couleur.create({
        nom: "argent",
    });
    const noir = await Couleur.create({
        nom: "noir",
    });
    const bleu = await Couleur.create({
        nom: "bleu",
    });
    const vert = await Couleur.create({
        nom: "vert",
    });
    const gris = await Couleur.create({
        nom: "gris",
    });
    const silver = await Couleur.create({
        nom: "silver",
    });
    const blancTransparent = await Couleur.create({
        nom: "blanc transparent",
    });
    const bleuTransparent = await Couleur.create({
        nom: "bleu transparent",
    });
    const roseTransparent = await Couleur.create({
        nom: "rose transparent",
    });
    
    //Creations de nbCarat 
    const arg = await NbCarat.create({
        valeur: "925/22 ct",
    });
    const or18 = await NbCarat.create({
        valeur: "750/18 ct",
    });
    const or14 = await NbCarat.create({
        valeur: "585/14 ct ",
    });
    const or9 = await NbCarat.create({
        valeur: "375/9 ct",
    });
    const diamantCt06 = await NbCarat.create({
        valeur: "Diamant/0.06 ct ",
    });
    const diamantCt15 = await NbCarat.create({
        valeur: "Diamant/0.15 ct ",
    });
    const diamantCt09 = await NbCarat.create({
        valeur: "Diamant/0.09 ct ",
    });
    const diamantCt05 = await NbCarat.create({
        valeur: "Diamant/0.05 ct ",
    });
    const diamantCt40 = await NbCarat.create({
        valeur: "Diamant/0.40 ct ",
    });
    const diamantCt57 = await NbCarat.create({
        valeur: "Diamant/0.57 ct ",
    });
    const diamantCt30 = await NbCarat.create({
        valeur: "Diamant/0.30 ct ",
    });
    const diamantCt28 = await NbCarat.create({
        valeur: "Diamant/0.28 ct ",
    });
    const diamantCt08 = await NbCarat.create({
        valeur: "Diamant/0.08 ct ",
    });

   
    const argent = await TypeDeMatiere.create({
        matiere: "argent "
    });
    const orBlanc = await TypeDeMatiere.create({
        matiere: "or blanc"
    });
    const orJaune = await TypeDeMatiere.create({
        matiere: "or jaune"
    });
    const orRose = await TypeDeMatiere.create({
        matiere: "or rose"
    });
    const orRouge = await TypeDeMatiere.create({
        matiere: "or rouge"
    });
    

    
    await orRouge.addNbCarat(or9)
    await orRouge.addNbCarat(or14)
    await orRouge.addNbCarat(or18)
    await orJaune.addNbCarat(or9)
    await orJaune.addNbCarat(or14)
    await orJaune.addNbCarat(or18)
    await orRose.addNbCarat(or9)
    await orRose.addNbCarat(or14)
    await orRose.addNbCarat(or18)
    await orBlanc.addNbCarat(or9)
    await orBlanc.addNbCarat(or14)
    await orBlanc.addNbCarat(or18)
    await argent.addNbCarat(arg)
   

     //Creations de Type de perle 
     const perleDeauDouce = await TypeDePerle.create({
        type: "perle d'eau douce"
    });
    const perleDeTahiti = await TypeDePerle.create({
        type: "perle de tahiti"
    });
     //Relation: type de perle - couleur 
     await perleDeauDouce.addCouleur(blanc)
     await perleDeauDouce.addCouleur(bleu)
     await perleDeTahiti.addCouleur(gris)

    //Creations de Type de pierres 
    const diamant = await TypeDePierre.create({
        nom: "diamant"
    });
    const zircone = await TypeDePierre.create({
        nom: "zircone"
    });
    const quartz = await TypeDePierre.create({
        nom: "quartz"
    });
    const emraude = await TypeDePierre.create({
        nom: "émeraude"
    });
    const aigueMarine = await TypeDePierre.create({
        nom: "aigue-Marine"
    });
    const rubis = await TypeDePierre.create({
        nom: "rubis"
    });
    const saphir = await TypeDePierre.create({
        nom: "saphir"
    });
    // type de pierre - couleur
    await diamant.addCouleur(blancTransparent)
    await aigueMarine.addCouleur(bleuTransparent)
    await zircone.addCouleur(blancTransparent)
    await quartz.addCouleur(rose)
    await emraude.addCouleur(vert)
    await rubis.addCouleur(roseTransparent)
    // type de pierre - nb carats
    await diamant.addNbCarat(diamantCt06)
    await diamant.addNbCarat(diamantCt15)
    await diamant.addNbCarat(diamantCt09)
    await diamant.addNbCarat(diamantCt05)
    await diamant.addNbCarat(diamantCt08)
    await diamant.addNbCarat(diamantCt28)
    await diamant.addNbCarat(diamantCt30)
    await diamant.addNbCarat(diamantCt40)
    await diamant.addNbCarat(diamantCt57)
    
    const imageBaseUrl = `/img/articles/`;

    //Creations des articles bague femme
    const articleFemmeBague1 = await Article.create({
        nom: "Bague Argent Zircone",
        prix: 415.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}601705.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleFemmeBague2= await Article.create({
        nom: "Bague à superposer Argent Rhodié",
        prix: 29.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}567940.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleFemmeBague3 = await Article.create({
        nom: "Bague solitaire Argent",
        prix: 59.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}524252.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleFemmeBague4 = await Article.create({
        nom: "Bague solitaire Or rose 750/18 K Diamant 0.06 ct",
        prix: 695.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}565946.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orRose.id,
        nbCaratId: or18.id
    });
    const articleFemmeBague5 = await Article.create({
        nom: "Bague Or rose 750/18 K Quartz rose",
        prix: 630.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}565863.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orRose.id,
        nbCaratId: or18.id
    });
    const articleFemmeBague6 = await Article.create({
        nom: "Bague solitaire Or rose 585/14 K Diamant 0.15 ct",
        prix: 960.00,
        message:"Or noble avec poinçon 585",
        image: `${imageBaseUrl}570601.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orRose.id,
        nbCaratId: or14.id
    });
    const articleFemmeBague7 = await Article.create({
        nom: "Bague Or jaune 750/18 K Zircone",
        prix: 344.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}549977.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    const articleFemmeBague8 = await Article.create({
        nom: "Bague à superposer Or jaune 750/18 K",
        prix: 198.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}584222.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    const articleFemmeBague9 = await Article.create({
        nom: "Bague Or blanc 585/14 K Émeraude",
        prix: 680.00,
        message:"Or noble avec poinçon 585",
        image: `${imageBaseUrl}591967.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or14.id
    });
    const articleFemmeBague10 = await Article.create({
        nom: "Bague à superposer Or blanc 585/14 K",
        prix: 249.00,
        message:"Or noble avec poinçon 585",
        image: `${imageBaseUrl}591934.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or14.id
    });
    const articleFemmeAlliance1 = await Article.create({
        nom: "La Radieuse, ALLIANCE - OR BLANC 18 CARATS - DIAMANT",
        prix: 2540.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}3493493.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    const articleFemmeAlliance2 = await Article.create({
        nom: "La Belle, Alliance or jaune 18 carats semi pavée - serti rail - Diamant",
        prix: 1610.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}3483468.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    const articleFemmeAlliance3 = await Article.create({
        nom: "Amoureuse, Alliance avec Diamant - or blanc 18 carats",
        prix: 2610.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}3523525.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    const articleFemmeAlliance4 = await Article.create({
        nom: "La Destinée - 71 diamants - or rose 18 carats",
        prix: 2810.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}232354235.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orRose.id,
        nbCaratId: or18.id
    });
    const articleFemmeAlliance5 = await Article.create({
        nom: "La tombeuse, ALLIANCE - or jaune 18 carats",
        prix: 480.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}34534534.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 2,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    //Creations des articles bague homme 
    const articleHommeBague1 = await Article.create({
        nom: "Bague en or avec diamant",
        prix: 690.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}337833.jpg`, 
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    const articleHommeBague2 = await Article.create({
        nom: "Bague homme argent à graver",
        prix: 229.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}331920.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleHommeBague3 = await Article.create({
        nom: "Bague en or gris avec zirconia",
        prix: 980.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}331278.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    const articleHommeBague4 = await Article.create({
        nom: "Chevalière or 375 avec diamant",
        prix: 329.00,
        message:"Or noble avec poinçon 375",
        image: `${imageBaseUrl}331296.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or9.id
    });
    const articleHommeAlliance1 = await Article.create({
        nom: "Le Radieux, ALLIANCE - OR BLANC 18 CARATS - DIAMANT ",
        prix: 1070.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}124124.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    const articleHommeAlliance2 = await Article.create({
        nom: "Le Beau, ALLIANCE - OR JAUNE 18 CARATS ",
        prix: 820.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}3233242366.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    const articleHommeAlliance3 = await Article.create({
        nom: "Amoureux, ALLIANCE - OR BLANC 18 CARATS ",
        prix: 1140.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}686868.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    const articleHommeAlliance4 = await Article.create({
        nom: "Le Destiné, ALLIANCE - OR ROSE 18 CARATS ",
        prix: 1140.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}657464.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: orRose.id,
        nbCaratId: or18.id
    });
    const articleHommeAlliance5 = await Article.create({
        nom: "Le Tombeur, ALLIANCE - OR JAUNE 18 CARATS ",
        prix: 490.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}454463.jpg`,
        categorieId: categorieBagues.id,
        selectionId: 1,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    //Creations des articles colliers & chaines femme
    const articleFemmeCollier1 = await Article.create({
        nom: "Chaînette avec pendentif Argent Zircone Rhodié Coeur",
        prix: 79.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}602041.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 2,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleFemmeCollier2 = await Article.create({
        nom: "Chaînette Argent Rhodié",
        prix: 59.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}599824.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 2,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleFemmeCollier3 = await Article.create({
        nom: "Collier Argent Rhodié perle d'eau douce",
        prix: 134.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}569388.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 2,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleFemmeCollier4 = await Article.create({
        nom: "Collier Or blanc 585/14 K Aigue-Marine",
        prix: 620.00,
        message:"Or noble avec poinçon 585",
        image: `${imageBaseUrl}592277.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or14.id
    });
    const articleFemmeCollier5 = await Article.create({
        nom: "Collier Or blanc 750/18 K Diamant 0.09 ct perle de Tahiti",
        prix: 690.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}570702.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    const articleFemmeCollier6 = await Article.create({
        nom: "Collier Or rouge 750/18 K Rubis",
        prix: 360.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}601561.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 2,
        typeDeMatiereId: orRouge.id,
        nbCaratId: or18.id
    });
    //Creations des articles colliers & chaines homme
    const articleHommeCollier1 = await Article.create({
        nom: "Chaînette Or jaune 585/14 K",
        prix: 598.00,
        message:"Or noble avec poinçon 585",
        image: `${imageBaseUrl}554701.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 1,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or14.id
    });
    const articleHommeCollier2 = await Article.create({
        nom: "Collier or rose 750",
        prix: 289.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}362119.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 1,
        typeDeMatiereId: orRose.id,
        nbCaratId: or18.id
    });
    const articleHommeCollier3 = await Article.create({
        nom: "Chaine Argent",
        prix: 124.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}526202.jpg`,
        categorieId: categorieCollier.id,
        selectionId: 1,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    //Creations des articles boucles d'oreilles
    const articleBoucleDoreillesFemme1 = await Article.create({
        nom: "Clous d'oreilles Argent Zircone Rhodié",
        prix: 49.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}596094.jpg`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleBoucleDoreillesFemme2 = await Article.create({
        nom: "Pendant d'oreilles Or blanc 750/18 K Diamant 0.08 ct perle d'eau douce",
        prix: 590.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}588053.jpg`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    const articleBoucleDoreillesFemme3 = await Article.create({
        nom: "Clous d'oreilles Or blanc 750/18 K Saphir",
        prix: 298.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}601560.jpg`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    const articleBoucleDoreillesFemme4 = await Article.create({
        nom: "Clous d'oreilles Or jaune 585/14 K",
        prix: 94.00,
        message:"Or noble avec poinçon 585",
        image: `${imageBaseUrl}https://www.rhomberg.be/fr/detail/clous-d-oreilles-or-jaune-585-14-k-595772.html?cat=17358`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or14.id
    });
    const articleBoucleDoreillesFemme5 = await Article.create({
        nom: "Créoles Or jaune 585/14 K",
        prix: 330.00,
        message:"Or noble avec poinçon 585",
        image: `${imageBaseUrl}591916.jpg`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or14.id
    });
    const articleBoucleDoreillesFemme6 = await Article.create({
        nom: "Clous d'oreilles Or jaune 750/18 K perle d'eau douce",
        prix: 298.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}593698.jpg`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    const articleBoucleDoreillesFemme7 = await Article.create({
        nom: "Clous d'oreilles Argent Rhodié perle d'eau douce",
        prix: 19.00,
        message:"Argent noble avec poinçon 925",
        image: `${imageBaseUrl}223708.jpg`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: argent.id,
        nbCaratId: arg.id
    });
    const articleBoucleDoreillesFemme8 = await Article.create({
        nom: "Créoles or 750",
        prix: 529.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}357353.jpg`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: orJaune.id,
        nbCaratId: or18.id
    });
    const articleBoucleDoreillesFemme9 = await Article.create({
        nom: "Clous d'oreilles Or blanc 750/18 K perle de Tahiti",
        prix: 360.00,
        message:"Or noble avec poinçon 750",
        image: `${imageBaseUrl}554564.jpg`,
        categorieId: categorieBouclesDoreilles.id,
        selectionId: 2,
        typeDeMatiereId: orBlanc.id,
        nbCaratId: or18.id
    });
    

    // article - couleur
    articleFemmeBague1.addCouleur(silver)
    articleFemmeBague2.addCouleur(silver)
    articleFemmeBague3.addCouleur(silver)
    articleFemmeBague4.addCouleur(rose)
    articleFemmeBague5.addCouleur(rose)
    articleFemmeBague6.addCouleur(rose)
    articleFemmeBague7.addCouleur(jaune)
    articleFemmeBague8.addCouleur(jaune)
    articleFemmeBague9.addCouleur(silver)
    articleFemmeBague10.addCouleur(silver)
    articleFemmeAlliance1.addCouleur(silver)
    articleFemmeAlliance2.addCouleur(jaune)
    articleFemmeAlliance3.addCouleur(silver)
    articleFemmeAlliance4.addCouleur(rose)
    articleFemmeAlliance5.addCouleur(jaune)
    articleFemmeCollier1.addCouleur(silver)
    articleFemmeCollier2.addCouleur(silver)
    articleFemmeCollier3.addCouleur(blanc)
    articleFemmeCollier4.addCouleur(silver)
    articleFemmeCollier5.addCouleur(silver)
    articleFemmeCollier6.addCouleur(rouge)
    articleHommeBague1.addCouleur(jaune)
    articleHommeBague2.addCouleur(silver)
    articleHommeBague3.addCouleur(silver)
    articleHommeBague4.addCouleur(jaune)
    articleHommeAlliance1.addCouleur(silver)
    articleHommeAlliance2.addCouleur(jaune)
    articleHommeAlliance3.addCouleur(silver)
    articleHommeAlliance4.addCouleur(rose)
    articleHommeAlliance5.addCouleur(jaune)
    articleHommeCollier1.addCouleur(jaune)
    articleHommeCollier2.addCouleur(rose)
    articleHommeCollier3.addCouleur(silver)
    articleBoucleDoreillesFemme1.addCouleur(silver)
    articleBoucleDoreillesFemme2.addCouleur(silver)
    articleBoucleDoreillesFemme3.addCouleur(silver)
    articleBoucleDoreillesFemme4.addCouleur(jaune)
    articleBoucleDoreillesFemme5.addCouleur(jaune)
    articleBoucleDoreillesFemme6.addCouleur(jaune)
    articleBoucleDoreillesFemme7.addCouleur(silver)
    articleBoucleDoreillesFemme8.addCouleur(jaune)
    articleBoucleDoreillesFemme9.addCouleur(silver)




    //_________________________________________ARTICLES AVEC PIERRES_________________________________________
    const bagueFemmeAvecPierres = await ArticleAvecPierre.create({
        nbPierres: "38",
        articleId: articleFemmeBague1.id,
        typeDePierreId: zircone.id,
        couleurId: blancTransparent.id
    });
    const bagueFemmeAvecPierres2 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleFemmeBague3.id,
        typeDePierreId: zircone.id,
        couleurId: blancTransparent.id
    });
    const bagueFemmeAvecPierres3 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleFemmeBague4.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt06.id
    });
    const bagueFemmeAvecPierres4 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleFemmeBague5.id,
        typeDePierreId: quartz.id,
        couleurId: rose.id,
    });
    const bagueFemmeAvecPierres5 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleFemmeBague6.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt15.id
    });
    const bagueFemmeAvecPierres6 = await ArticleAvecPierre.create({
        nbPierres: "3",
        articleId: articleFemmeBague7.id,
        typeDePierreId: zircone.id,
        couleurId: blancTransparent.id,
    });
    const bagueFemmeAvecPierres7 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleFemmeBague9.id,
        typeDePierreId: emraude.id,
        couleurId: vert.id,
    });
    const bagueFemmeAvecPierres8 = await ArticleAvecPierre.create({
        nbPierres: "38",
        articleId: articleFemmeAlliance1.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt57.id
    });
    const bagueFemmeAvecPierres9 = await ArticleAvecPierre.create({
        nbPierres: "10",
        articleId: articleFemmeAlliance2.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt30.id
    });
    const bagueFemmeAvecPierres10 = await ArticleAvecPierre.create({
        nbPierres: "29",
        articleId: articleFemmeAlliance3.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt30.id
    });
    const bagueFemmeAvecPierres11 = await ArticleAvecPierre.create({
        nbPierres: "71",
        articleId: articleFemmeAlliance4.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt28.id
    });
    const bagueHommeAvecPierres1 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleHommeBague1.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt05.id
    });
    const bagueHommeAvecPierres2 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleHommeBague3.id,
        typeDePierreId: zircone.id,
        couleurId: blancTransparent.id,
        //nbCaratId: diamantCt05.id
    });
    const bagueHommeAvecPierres3 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleHommeBague4.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt05.id
    });
    const bagueHommeAvecPierres4 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleHommeAlliance1.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt08.id
    });
    const collierFemmeAvecPierres1 = await ArticleAvecPierre.create({
        nbPierres: "21",
        articleId: articleFemmeCollier1.id,
        typeDePierreId: zircone.id,
        couleurId: blancTransparent.id
    });
    const collierFemmeAvecPierres2 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleFemmeCollier4.id,
        typeDePierreId: aigueMarine.id,
        couleurId: bleuTransparent.id,
    });
    const collierFemmeAvecPierres3 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleFemmeCollier5.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt09.id
    });
    const collierFemmeAvecPierres4 = await ArticleAvecPierre.create({
        nbPierres: "1",
        articleId: articleFemmeCollier6.id,
        typeDePierreId: rubis.id,
        couleurId: roseTransparent.id,
        //nbCaratId: diamantCt09.id
    });
    const bouclesDoreillesFemmeAvecPierres1 = await ArticleAvecPierre.create({
        nbPierres: "2",
        articleId: articleBoucleDoreillesFemme1.id,
        typeDePierreId: zircone.id,
        couleurId: blancTransparent.id,
        //nbCaratId: diamantCt09.id
    });
    const bouclesDoreillesFemmeAvecPierres2 = await ArticleAvecPierre.create({
        nbPierres: "18",
        articleId: articleBoucleDoreillesFemme2.id,
        typeDePierreId: diamant.id,
        couleurId: blancTransparent.id,
        nbCaratId: diamantCt08.id
    });
    const bouclesDoreillesFemmeAvecPierres3 = await ArticleAvecPierre.create({
        nbPierres: "2",
        articleId: articleBoucleDoreillesFemme3.id,
        typeDePierreId: saphir.id,
        couleurId: bleu.id,
        //nbCaratId: diamantCt08.id
    });
    //_________________________________________ARTICLES AVEC PERLES _________________________________________
    
    //Creations des colliers chaines avec perle femme
    const collierChaineAvecPerles1 = await ArticleAvecPerle.create({
        nbPerles: "48",
        articleId: articleFemmeCollier3.id,
        typeDePerleId: perleDeauDouce.id,
        couleurId: blanc.id
    });
    const collierChaineAvecPerles2 = await ArticleAvecPerle.create({
        nbPerles: "1",
        articleId: articleFemmeCollier5.id,
        typeDePerleId: perleDeTahiti.id,
        couleurId: gris.id
    });
    const bouclesDoreillesAvecPerles1 = await ArticleAvecPerle.create({
        nbPerles: "2",
        articleId: articleBoucleDoreillesFemme2.id,
        typeDePerleId: perleDeauDouce.id,
        couleurId: blanc.id
    });
    const bouclesDoreillesAvecPerles2 = await ArticleAvecPerle.create({
        nbPerles: "2",
        articleId: articleBoucleDoreillesFemme6.id,
        typeDePerleId: perleDeauDouce.id,
        couleurId: blanc.id
    });
    const bouclesDoreillesAvecPerles3 = await ArticleAvecPerle.create({
        nbPerles: "2",
        articleId: articleBoucleDoreillesFemme7.id,
        typeDePerleId: perleDeauDouce.id,
        couleurId: bleu.id
    });
    const bouclesDoreillesAvecPerles4 = await ArticleAvecPerle.create({
        nbPerles: "2",
        articleId: articleBoucleDoreillesFemme9.id,
        typeDePerleId: perleDeTahiti.id,
        couleurId: gris.id
    });
    
    



    


   







    // Creation de tailles pour bagues  
    const tailleBague48 = await Taille.create({
        taille: "48"
    })
    const tailleBague50 = await Taille.create({
        taille: "50"
    })
    const tailleBague52 = await Taille.create({
        taille: "52"
    })
    const tailleBague54 = await Taille.create({
        taille: "54"
    })
    const tailleBague56 = await Taille.create({
        taille: "56"
    })
    const tailleBague58 = await Taille.create({
        taille: "58"
    })
    const tailleBague60 = await Taille.create({
        taille: "60"
    })
    const tailleBague62 = await Taille.create({
        taille: "62"
    })
    // Creation de tailles pour colliers chaines  
    const tailleCollier42 = await Taille.create({
        taille: "42"
    })
    const tailleCollier45 = await Taille.create({
        taille: "45"
    })
    const tailleCollier50 = await Taille.create({
        taille: "50"
    })
    const tailleCollier55 = await Taille.create({
        taille: "55"
    })
    const tailleCollier60 = await Taille.create({
        taille: "60"
    })
    const tailleUnique = await Taille.create({
        taille: "taille unique"
    })

    // Article - Taille pour bague femme 
    const articleTaille1 = await ArticleTaille.create({
        stock: "0",
        articleId: articleFemmeBague1.id,
        tailleId: tailleBague48.id
    })
    const articleTaille2 = await ArticleTaille.create({
        stock: "17",
        articleId: articleFemmeBague1.id,
        tailleId: tailleBague50.id
    })
    const articleTaille3 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeBague1.id,
        tailleId: tailleBague52.id
    })
    const articleTaille4 = await ArticleTaille.create({
        stock: "20",
        articleId: articleFemmeBague2.id,
        tailleId: tailleBague48.id
    })
    const articleTaille5 = await ArticleTaille.create({
        stock: "30",
        articleId: articleFemmeBague2.id,
        tailleId: tailleBague52.id
    })
    const articleTaille6 = await ArticleTaille.create({
        stock: "15",
        articleId: articleFemmeBague3.id,
        tailleId: tailleBague50.id
    })
    const articleTaille7 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeBague3.id,
        tailleId: tailleBague54.id
    })
    const articleTaille8 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeBague4.id,
        tailleId: tailleBague48.id
    })
    const articleTaille9 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeBague4.id,
        tailleId: tailleBague52.id
    })
    const articleTaille10 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeBague5.id,
        tailleId: tailleBague50.id
    })
    const articleTaille11 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeBague5.id,
        tailleId: tailleBague52.id
    })
    const articleTaille12 = await ArticleTaille.create({
        stock: "3",
        articleId: articleFemmeBague6.id,
        tailleId: tailleBague50.id
    })
    const articleTaille13 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeBague7.id,
        tailleId: tailleBague54.id
    })
    const articleTaille14 = await ArticleTaille.create({
        stock: "5",
        articleId: articleFemmeBague7.id,
        tailleId: tailleBague50.id
    })
    const articleTaille15 = await ArticleTaille.create({
        stock: "15",
        articleId: articleFemmeBague8.id,
        tailleId: tailleBague50.id
    })
    const articleTaille16 = await ArticleTaille.create({
        stock: "20",
        articleId: articleFemmeBague8.id,
        tailleId: tailleBague56.id
    })
    const articleTaille17 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeBague9.id,
        tailleId: tailleBague48.id
    })
    const articleTaille18 = await ArticleTaille.create({
        stock: "20",
        articleId: articleFemmeBague9.id,
        tailleId: tailleBague50.id
    })
    const articleTaille19 = await ArticleTaille.create({
        stock: "7",
        articleId: articleFemmeBague9.id,
        tailleId: tailleBague52.id
    })
    const articleTaille20 = await ArticleTaille.create({
        stock: "20",
        articleId: articleFemmeBague10.id,
        tailleId: tailleBague56.id
    })
    const articleTaille21 = await ArticleTaille.create({
        stock: "15",
        articleId: articleFemmeAlliance1.id,
        tailleId: tailleBague52.id
    })
    const articleTaille22 = await ArticleTaille.create({
        stock: "15",
        articleId: articleFemmeAlliance1.id,
        tailleId: tailleBague50.id
    })
    const articleTaille23 = await ArticleTaille.create({
        stock: "3",
        articleId: articleFemmeAlliance2.id,
        tailleId: tailleBague52.id
    })
    const articleTaille24 = await ArticleTaille.create({
        stock: "15",
        articleId: articleFemmeAlliance2.id,
        tailleId: tailleBague48.id
    })
    const articleTaille25 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeAlliance3.id,
        tailleId: tailleBague52.id
    })
    const articleTaille26 = await ArticleTaille.create({
        stock: "15",
        articleId: articleFemmeAlliance4.id,
        tailleId: tailleBague50.id
    })
    const articleTaille27 = await ArticleTaille.create({
        stock: "15",
        articleId: articleFemmeAlliance4.id,
        tailleId: tailleBague52.id
    })
    const articleTaille28 = await ArticleTaille.create({
        stock: "2",
        articleId: articleFemmeAlliance5.id,
        tailleId: tailleBague56.id
    })
    // Article - Taille pour collier femme 
    const articleTailleCollierFemme1 = await ArticleTaille.create({
        stock: "20",
        articleId: articleFemmeCollier1.id,
        tailleId: tailleCollier42.id
    })
    const articleTailleCollierFemme2 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeCollier2.id,
        tailleId: tailleCollier45.id
    })
    const articleTailleCollierFemme3 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeCollier3.id,
        tailleId: tailleCollier42.id
    })
    const articleTailleCollierFemme4 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeCollier4.id,
        tailleId: tailleCollier42.id
    })
    const articleTailleCollierFemme5 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeCollier5.id,
        tailleId: tailleCollier42.id
    })
    const articleTailleCollierFemme6 = await ArticleTaille.create({
        stock: "10",
        articleId: articleFemmeCollier6.id,
        tailleId: tailleCollier45.id
    })
    // Article - Taille pour collier Hommes 
    const articleTailleCollierHomme1 = await ArticleTaille.create({
        stock: "10",
        articleId: articleHommeCollier1.id,
        tailleId: tailleCollier50.id
    })
    const articleTailleCollierHomme2 = await ArticleTaille.create({
        stock: "10",
        articleId: articleHommeCollier2.id,
        tailleId: tailleCollier55.id
    })
    const articleTailleCollierHomme3 = await ArticleTaille.create({
        stock: "10",
        articleId: articleHommeCollier3.id,
        tailleId: tailleCollier50.id
    })
    // Article - Taille pour bague Hommes 
    const articleTailleHomme1 = await ArticleTaille.create({
        stock: "20",
        articleId: articleHommeBague1.id,
        tailleId: tailleBague60.id
    })
    const articleTailleHomme2 = await ArticleTaille.create({
        stock: "15",
        articleId: articleHommeBague1.id,
        tailleId: tailleBague62.id
    })
    const articleTailleHomme3 = await ArticleTaille.create({
        stock: "10",
        articleId: articleHommeBague2.id,
        tailleId: tailleBague62.id
    })
    const articleTailleHomme4 = await ArticleTaille.create({
        stock: "15",
        articleId: articleHommeBague3.id,
        tailleId: tailleBague62.id
    })
    const articleTailleHomme5 = await ArticleTaille.create({
        stock: "15",
        articleId: articleHommeBague3.id,
        tailleId: tailleBague60.id
    })
    const articleTailleHomme6 = await ArticleTaille.create({
        stock: "15",
        articleId: articleHommeBague4.id,
        tailleId: tailleBague62.id
    })
    const articleTailleHomme7 = await ArticleTaille.create({
        stock: "15",
        articleId: articleHommeAlliance1.id,
        tailleId: tailleBague62.id
    })
    const articleTailleHomme8 = await ArticleTaille.create({
        stock: "10",
        articleId: articleHommeAlliance1.id,
        tailleId: tailleBague60.id
    })
    const articleTailleHomme9 = await ArticleTaille.create({
        stock: "10",
        articleId: articleHommeAlliance2.id,
        tailleId: tailleBague60.id
    })
    const articleTailleHomme10 = await ArticleTaille.create({
        stock: "10",
        articleId: articleHommeAlliance3.id,
        tailleId: tailleBague62.id
    })
    const articleTailleHomme11 = await ArticleTaille.create({
        stock: "10",
        articleId: articleHommeAlliance4.id,
        tailleId: tailleBague62.id
    })
    const articleTailleHomme12 = await ArticleTaille.create({
        stock: "5",
        articleId: articleHommeAlliance4.id,
        tailleId: tailleBague60.id
    })
    const articleTailleHomme13 = await ArticleTaille.create({
        stock: "20",
        articleId: articleHommeAlliance5.id,
        tailleId: tailleBague62.id
    })
    // Article - Taille pour Boucles d'oreilles 
    const articleTailleBoucleDoreilles1 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme1.id,
        tailleId: tailleUnique.id
    })
    const articleTailleBoucleDoreilles2 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme2.id,
        tailleId: tailleUnique.id
    })
    const articleTailleBoucleDoreilles3 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme3.id,
        tailleId: tailleUnique.id
    })
    const articleTailleBoucleDoreilles4 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme4.id,
        tailleId: tailleUnique.id
    })
    const articleTailleBoucleDoreilles5 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme5.id,
        tailleId: tailleUnique.id
    })
    const articleTailleBoucleDoreilles6 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme6.id,
        tailleId: tailleUnique.id
    })
    const articleTailleBoucleDoreilles7 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme7.id,
        tailleId: tailleUnique.id
    })
    const articleTailleBoucleDoreilles8 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme8.id,
        tailleId: tailleUnique.id
    })
    const articleTailleBoucleDoreilles9 = await ArticleTaille.create({
        stock: "20",
        articleId: articleBoucleDoreillesFemme9.id,
        tailleId: tailleUnique.id
    })

    // creations de mesures 
    const mesurePoids = await Mesure.create({
        mesure: "poids"
    })
    const mesureDiametre = await Mesure.create({
        mesure: "diametre"
    })
    const mesureLongueur = await Mesure.create({
        mesure: "longueur"
    })
    const mesureLargeur = await Mesure.create({
        mesure: "largeur"
    })
    const mesureEpaisseur = await Mesure.create({
        mesure: "epaisseur"
    })

    // creations du  Guide de tailles pour bague femme 
    const guideDeTailleArticleBagueFemme1diametre = await GuideDeTailleArticle.create({
        valeur_mesure: "15.3",
        unite_mesure: "mm",
        articleId: articleTaille1.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille1.tailleId
    })
    /*
    const guideDeTailleArticleBagueFemme1epaisseur = await GuideDeTailleArticle.create({
        valeur_mesure: "0.3",
        unite_mesure: "mm",
        articleId: articleTaille1.articleId,
        mesureId: mesureEpaisseur.id,
        tailleId: articleTaille1.tailleId
    })
    const guideDeTailleArticleBagueFemme1poids = await GuideDeTailleArticle.create({
        valeur_mesure: "1.3",
        unite_mesure: "g",
        articleId: articleTaille1.articleId,
        mesureId: mesureEpaisseur.id,
        tailleId: articleTaille1.tailleId
    })
    */
    const guideDeTailleArticleBagueFemme1b = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille2.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille2.tailleId
    })
    const guideDeTailleArticleBagueFemme1c = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille3.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille3.tailleId
    })
    const guideDeTailleArticleBagueFemme2 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.3",
        unite_mesure: "mm",
        articleId: articleTaille4.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille4.tailleId
    })
    const guideDeTailleArticleBagueFemme2b = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille5.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille5.tailleId
    })
    const guideDeTailleArticleBagueFemme3 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille6.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille6.tailleId
    })
    const guideDeTailleArticleBagueFemme3b = await GuideDeTailleArticle.create({
        valeur_mesure: "17.2",
        unite_mesure: "mm",
        articleId: articleTaille7.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille7.tailleId
    })
    const guideDeTailleArticleBagueFemme4 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.3",
        unite_mesure: "mm",
        articleId: articleTaille8.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille8.tailleId
    })
    const guideDeTailleArticleBagueFemme4b = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille9.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille9.tailleId
    })
    const guideDeTailleArticleBagueFemme5 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille10.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille10.tailleId
    })
    const guideDeTailleArticleBagueFemme5b = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille11.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille11.tailleId
    })
    const guideDeTailleArticleBagueFemme6 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille12.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille12.tailleId
    })
    const guideDeTailleArticleBagueFemme7 = await GuideDeTailleArticle.create({
        valeur_mesure: "17.2",
        unite_mesure: "mm",
        articleId: articleTaille13.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille13.tailleId
    })
    const guideDeTailleArticleBagueFemme7b = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille14.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille14.tailleId
    })
    const guideDeTailleArticleBagueFemme8 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille15.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille15.tailleId
    })
    const guideDeTailleArticleBagueFemme8b = await GuideDeTailleArticle.create({
        valeur_mesure: "17.8",
        unite_mesure: "mm",
        articleId: articleTaille16.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille16.tailleId
    })
    const guideDeTailleArticleBagueFemme9 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.3",
        unite_mesure: "mm",
        articleId: articleTaille17.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille17.tailleId
    })
    const guideDeTailleArticleBagueFemme9b = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille18.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille18.tailleId
    })
    const guideDeTailleArticleBagueFemme9c = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille19.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille19.tailleId
    })
    const guideDeTailleArticleBagueFemme10 = await GuideDeTailleArticle.create({
        valeur_mesure: "17.8",
        unite_mesure: "mm",
        articleId: articleTaille20.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille20.tailleId
    })
    const guideDeTailleArticleBagueFemme11 = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille21.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille21.tailleId
    })
    const guideDeTailleArticleBagueFemme12 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille22.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille22.tailleId
    })
    const guideDeTailleArticleBagueFemme13 = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille23.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille23.tailleId
    })
    const guideDeTailleArticleBagueFemme14 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.3",
        unite_mesure: "mm",
        articleId: articleTaille24.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille24.tailleId
    })
    const guideDeTailleArticleBagueFemme15 = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille25.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille25.tailleId
    })
    const guideDeTailleArticleBagueFemme16 = await GuideDeTailleArticle.create({
        valeur_mesure: "15.9",
        unite_mesure: "mm",
        articleId: articleTaille26.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille26.tailleId
    })
    const guideDeTailleArticleBagueFemme17 = await GuideDeTailleArticle.create({
        valeur_mesure: "16.6",
        unite_mesure: "mm",
        articleId: articleTaille27.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille27.tailleId
    })
    const guideDeTailleArticleBagueFemme18 = await GuideDeTailleArticle.create({
        valeur_mesure: "17.8",
        unite_mesure: "mm",
        articleId: articleTaille28.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTaille28.tailleId
    })
    // creations du  Guide de tailles pour colliers femme 
    const guideDeTailleArticleCollierFemme1 = await GuideDeTailleArticle.create({
        valeur_mesure: "42",
        unite_mesure: "cm",
        articleId: articleTailleCollierFemme1.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierFemme1.tailleId
    })
    const guideDeTailleArticleCollierFemme2 = await GuideDeTailleArticle.create({
        valeur_mesure: "45",
        unite_mesure: "cm",
        articleId: articleTailleCollierFemme2.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierFemme2.tailleId
    })
    const guideDeTailleArticleCollierFemme3 = await GuideDeTailleArticle.create({
        valeur_mesure: "42",
        unite_mesure: "cm",
        articleId: articleTailleCollierFemme3.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierFemme3.tailleId
    })
    const guideDeTailleArticleCollierFemme4 = await GuideDeTailleArticle.create({
        valeur_mesure: "42",
        unite_mesure: "cm",
        articleId: articleTailleCollierFemme4.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierFemme4.tailleId
    })
    const guideDeTailleArticleCollierFemme5 = await GuideDeTailleArticle.create({
        valeur_mesure: "42",
        unite_mesure: "cm",
        articleId: articleTailleCollierFemme5.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierFemme5.tailleId
    })
    const guideDeTailleArticleCollierFemme6 = await GuideDeTailleArticle.create({
        valeur_mesure: "45",
        unite_mesure: "cm",
        articleId: articleTailleCollierFemme6.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierFemme6.tailleId
    })
    // creations du  Guide de tailles pour bague Homme 
    const guideDeTailleArticleBagueHomme1 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.1",
        unite_mesure: "mm",
        articleId: articleTailleHomme1.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme1.tailleId
    })
    const guideDeTailleArticleBagueHomme2 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.7",
        unite_mesure: "mm",
        articleId: articleTailleHomme2.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme2.tailleId
    })
    const guideDeTailleArticleBagueHomme3 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.7",
        unite_mesure: "mm",
        articleId: articleTailleHomme3.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme3.tailleId
    })
    const guideDeTailleArticleBagueHomme4 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.7",
        unite_mesure: "mm",
        articleId: articleTailleHomme4.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme4.tailleId
    })
    const guideDeTailleArticleBagueHomme5 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.1",
        unite_mesure: "mm",
        articleId: articleTailleHomme5.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme5.tailleId
    })
    const guideDeTailleArticleBagueHomme6 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.7",
        unite_mesure: "mm",
        articleId: articleTailleHomme6.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme6.tailleId
    })
    const guideDeTailleArticleBagueHomme7 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.7",
        unite_mesure: "mm",
        articleId: articleTailleHomme7.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme7.tailleId
    })
    const guideDeTailleArticleBagueHomme8 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.1",
        unite_mesure: "mm",
        articleId: articleTailleHomme8.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme8.tailleId
    })
    const guideDeTailleArticleBagueHomme9 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.1",
        unite_mesure: "mm",
        articleId: articleTailleHomme9.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme9.tailleId
    })
    const guideDeTailleArticleBagueHomme10 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.7",
        unite_mesure: "mm",
        articleId: articleTailleHomme10.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme10.tailleId
    })
    const guideDeTailleArticleBagueHomme11 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.7",
        unite_mesure: "mm",
        articleId: articleTailleHomme11.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme11.tailleId
    })
    const guideDeTailleArticleBagueHomme12 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.1",
        unite_mesure: "mm",
        articleId: articleTailleHomme12.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme12.tailleId
    })
    const guideDeTailleArticleBagueHomme13 = await GuideDeTailleArticle.create({
        valeur_mesure: "19.7",
        unite_mesure: "mm",
        articleId: articleTailleHomme13.articleId,
        mesureId: mesureDiametre.id,
        tailleId: articleTailleHomme13.tailleId
    })
    // creations du  Guide de tailles pour colliers HOMME 
    const guideDeTailleArticleCollierHomme1 = await GuideDeTailleArticle.create({
        valeur_mesure: "50",
        unite_mesure: "cm",
        articleId: articleTailleCollierHomme1.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierHomme1.tailleId
    })
    const guideDeTailleArticleCollierHomme2 = await GuideDeTailleArticle.create({
        valeur_mesure: "55",
        unite_mesure: "cm",
        articleId: articleTailleCollierHomme2.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierHomme2.tailleId
    })
    const guideDeTailleArticleCollierHomme3 = await GuideDeTailleArticle.create({
        valeur_mesure: "50",
        unite_mesure: "cm",
        articleId: articleTailleCollierHomme3.articleId,
        mesureId: mesureLongueur.id,
        tailleId: articleTailleCollierHomme3.tailleId
    })
    await sequelize.close();
    
    } catch (error) {
        console.log("erreur au niveau de la migration"+ error)
    }

    
})()













