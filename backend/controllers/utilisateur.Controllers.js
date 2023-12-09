const asyncHandler = require('../middleware/asyncHandler');
const {Utilisateur, Role} = require('../dev-data/schema');
const { hashPassword, comparePasswords } = require('../config/password_hash')
const {generateToken, generateResetToken} = require('../config/generateToken');
const mailer = require('../config/nodeMailer');
const { where } = require('sequelize');

//@desc Register utilisateur & get token
//@route POST /api/utilisateurs
// @access Public
const registerUser = asyncHandler(async(req,res, next) =>{
    const {nom, prenom, email, telephone, adresse, password} = req.body;
    
    const utilisateurExistant = await Utilisateur.findOne({
        where: {email: email}
    });
    const trimmedNom = nom ? nom.trim() : '';
    const trimmedPrenom = prenom ? prenom.trim() : '';
    const trimmedEmail = email ? email.trim() : '';
    const trimmedTelephone = telephone ? telephone.trim() : '';
    const trimmedAdresse = adresse ? adresse.trim() : '';

    if(utilisateurExistant){
        res.status(400);
        throw new Error('cet utilisateur existe dans notre base de donnée.')
    }
    
    const newUtilisateur = await Utilisateur.create({
        nom: trimmedNom,
        prenom: trimmedPrenom,
        email: trimmedEmail,
        telephone: trimmedTelephone,
        adresse: trimmedAdresse,
        password: await hashPassword(password),
        roleId: 1,
    });
    if(newUtilisateur) {
        generateToken(res, newUtilisateur.id); // token

        res.status(201).json({
            //id: newUtilisateur.id,
            nom: newUtilisateur.nom,
            prenom: newUtilisateur.prenom,
            email:newUtilisateur.email,
            telephone: newUtilisateur.telephone,
            adresse: newUtilisateur.adresse,
            //password: newUtilisateur.password,
            roleId: newUtilisateur.roleId,
        })
        const contact =  {
            to: email,
            subject: `🎉 Bienvenue chez V.Bijouterie ! `,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenue chez V.Bijouterie</title>
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
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Bienvenue chez V.Bijouterie</h2>
                    <p>Merci ${nom} ${prenom} de vous être enregistré sur notre site V.Bijouterie. Nous sommes ravis de vous compter parmi nos clients.</p>
                    <p>Découvrez notre collection exclusive de bijoux pour compléter votre style.</p>
                    <p>Merci de nous faire confiance, et à bientôt sur V.Bijouterie !</p>
                </div>
            </body>
            </html>
            `
          }
          mailer(contact)

    }else{
        res.status(400);
        throw new Error("l'inscription a échoué")
    }
    
   
})

//@desc Auth utilisateur & get token
//@route POST /api/utilisateurs/login
// @access Public
const authUser = asyncHandler(async(req,res, next) =>{
    const {email, password} = req.body;
    //console.log("email:"+email+" password:"+password)
    const utilisateur = await Utilisateur.findOne({
        where: {email: email}
    });
    if(utilisateur && await comparePasswords(password, utilisateur.password) ){

        generateToken(res, utilisateur.id)

        res.status(200).json({
            id: utilisateur.id,
            nom: utilisateur.nom,
            prenom: utilisateur.prenom,
            email: utilisateur.email,
            telephone: utilisateur.telephone,
            adresse: utilisateur.adresse,
            role: utilisateur.roleId,
        })
          
    }else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

//@desc Logout utilisateur & clear cookie
//@route POST /api/utilisateurs/logout
// @access Private
const logoutUser = asyncHandler(async(req,res) =>{
    res.cookie('jwt','', {
        httpOnly:true,
        expires: new Date(0)
    });

    res.status(200).json({message: 'logout successfully'})
})


//@desc Get utilisateur 
//@route GET /api/utilisateurs/profile
// @access Private
const getUserProfile = asyncHandler(async(req,res) =>{
    const utilisateur = await Utilisateur.findByPk(req.utilisateur.id);

    if(utilisateur) {
        res.status(200).json({
            //id: utilisateur.id,
            nom: utilisateur.nom,
            prenom: utilisateur.prenom,
            email: utilisateur.email,
            telephone: utilisateur.telephone,
            adresse: utilisateur.adresse,
            //roleId: utilisateur.roleId,
        })
    }else {
        res.status(404);
        throw new Error('Utilisateur not found')
    }
})


//@desc Update utilisateur 
//@route PUT /api/utilisateurs/profile
// @access Private
const updateUserProfile = asyncHandler(async(req,res) =>{
    const utilisateur = await Utilisateur.findByPk(req.body.utilisateurId);
    
    const userExist = await Utilisateur.findOne({where: {email: req.body.email}})
    
    if(req.body.email) {
        if(userExist && userExist.email !== utilisateur.email){
            res.status(400);
            throw new Error('cet email est deja associé a un utilisateur.')
        }
    }
    
    if(utilisateur) {   
        const updatedUtilisateur = await utilisateur.update({
            nom : req.body.nom || utilisateur.nom,
            prenom: req.body.prenom || utilisateur.prenom,
            email:req.body.email || utilisateur.email,
            adresse: req.body.adresse || utilisateur.adresse,
            telephone: req.body.telephone || utilisateur.telephone,
            password: req.body.password ? await hashPassword(req.body.password) : utilisateur.password,
            //roleId: utilisateur.roleId,
        })
        res.status(200).json({
            id: updatedUtilisateur.id,
            nom: updatedUtilisateur.nom,
            prenom: updatedUtilisateur.prenom,
            email: updatedUtilisateur.email,
            telephone: updatedUtilisateur.telephone,
            adresse: updatedUtilisateur.adresse,
            //password: updatedUtilisateur.password
            roleId: utilisateur.roleId,
        })
    }else {
        res.status(404);
        throw new Error('update user not found')
    }
})

//---------------------ADMIN------------------------------------

//@desc Get utilisateurs
//@route GET /api/utilisateurs
// @access Private/Admin
const getUsers = asyncHandler(async(req,res) =>{
    console.log("tentative d'acces a la route getUsers")
    const utilisateurs = await Utilisateur.findAll({});
    res.status(200).json(utilisateurs)
   
})

//@desc Get utilisateur 
//@route GET /api/utilisateurs/:id
// @access Private/Admin
const getUserById = asyncHandler(async(req,res) =>{
    
   
    const utilisateur = await Utilisateur.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ['password'] 
        }
    })
    const roles = await Role.findAll();
    const userRole = await Role.findOne({where:{id: utilisateur.roleId}});
    if(utilisateur) {
        res.status(200).json({utilisateur, userRole, roles})
    }else {
        throw new Error('utilisateur introuvable')
    }
})


//@desc update utilisateur 
//@route PUT /api/utilisateurs/:id
// @access Private/Admin
const updateUser = asyncHandler(async(req,res) =>{
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    let role =  await Role.findOne({where:{role:req.body.role}});
    
    const userExist = await Utilisateur.findOne({where: {email: req.body.email}})
    if(userExist && userExist.email !== utilisateur.email){
        res.status(400);
        throw new Error('cet utilisateur existe dans notre base de donnée.')
    }
    
    if(utilisateur) {
        
        const updatedUtilisateur = await Utilisateur.update(
            {
            nom: req.body.nom || utilisateur.nom,
            prenom: req.body.prenom || utilisateur.prenom,
            email: req.body.email || utilisateur.email,
            telephone: req.body.telephone ? req.body.telephone : req.body.telephone === "" ? req.body.telephone: utilisateur.telephone,
            adresse: req.body.adresse || utilisateur.adresse,
            password: req.body.password ? await hashPassword(req.body.password) : utilisateur.password,
            roleId: parseInt(role.id) || utilisateur.roleId, 
            }, 
            {where: {id: req.params.id}}
        )
        res.status(200).json({
           id: updatedUtilisateur.id,
           nom: updatedUtilisateur.nom, 
           prenom: updatedUtilisateur.prenom,
           email: updatedUtilisateur.email,
           telephone: updatedUtilisateur.telephone,
           adresse: updatedUtilisateur.adresse,
           roleId: updatedUtilisateur.roleId,
        })
    }
    else {
        res.status(404)
        throw new Error('utilisateur introuvable')
    }
    
})


//@desc Delete utilisateurs
//@route DELETE /api/utilisateurs/:id
// @access Private/Admin
const deleteUser = asyncHandler(async(req,res) =>{
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if(utilisateur) {
        if(utilisateur.roleId === 2) {
            res.status(400);
            throw new Error('impossible de supprimer un admin.')
        }
        await Utilisateur.destroy({
            where:{id: req.params.id}
        });
        res.status(200).json({message: "l'utilisateur a été supprimé."})  
    }else {
        res.status(404);
        throw new Error('utilisateur introuvable')
    }  
})









module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    getUserProfile,
    updateUser,
    updateUserProfile,
    deleteUser,
    getUserById,

}