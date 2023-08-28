const asyncHandler = require('../middleware/asyncHandler');
const {Utilisateur, Role} = require('../dev-data/schema');
const { hashPassword, comparePasswords } = require('../config/password_hash')
const generateToken = require('../config/generateToken');

//@desc Register utilisateur & get token
//@route POST /api/utilisateurs
// @access Public
const registerUser = asyncHandler(async(req,res, next) =>{
    const {nom, prenom, email, telephone, adresse, password} = req.body;
    const utilisateurExistant = await Utilisateur.findOne({
        where: {email: email}
    });
    if(utilisateurExistant){
        res.status(400);
        throw new Error('cet utilisateur existe dans notre base de donnée.')
    }
    const newUtilisateur = await Utilisateur.create({
        nom: nom,
        prenom: prenom,
        email:email,
        telephone: telephone,
        adresse: adresse,
        password: await hashPassword(password),
        roleId: 1,
    });
    if(newUtilisateur) {
        generateToken(res, newUtilisateur.id); // token

        res.status(201).json({
            id: newUtilisateur.id,
            nom: newUtilisateur.nom,
            prenom: newUtilisateur.prenom,
            email:newUtilisateur.email,
            telephone: newUtilisateur.telephone,
            adresse: newUtilisateur.adresse,
            password: newUtilisateur.password,
            roleId: newUtilisateur.roleId,
        })
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
    const utilisateur = await Utilisateur.findByPk(req.utilisateur.id);

    if(utilisateur) {   
        const updatedUtilisateur = await utilisateur.update({
            nom : req.body.nom || utilisateur.nom,
            prenom: req.body.prenom || utilisateur.prenom,
            email:req.body.email || utilisateur.email,
            adresse: req.body.adresse || utilisateur.adresse,
            password: req.body.password ? await hashPassword(req.body.password) : utilisateur.password
        })
        res.status(200).json({
            id: updatedUtilisateur.id,
            nom: updatedUtilisateur.nom,
            prenom: updatedUtilisateur.prenom,
            email: updatedUtilisateur.email,
            adresse: updatedUtilisateur.adresse,
            password: updatedUtilisateur.password
            //roleId: utilisateur.roleId,
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
    res.send('get users')
})

//@desc Get utilisateur 
//@route GET /api/utilisateurs/:id
// @access Private/Admin
const getUserById = asyncHandler(async(req,res) =>{
    res.send('get user by id')
})


//@desc update utilisateur 
//@route PUT /api/utilisateurs/:id
// @access Private/Admin
const updateUser = asyncHandler(async(req,res) =>{
    res.send('update user')
})


//@desc Delete utilisateurs
//@route DELETE /api/utilisateurs/:id
// @access Private/Admin
const deleteUser = asyncHandler(async(req,res) =>{
    res.send('delete user')
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