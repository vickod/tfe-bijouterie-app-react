const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const {Utilisateur, Role} = require('../dev-data/schema');


//protection de routes
const protect = asyncHandler(async(req, res, next) => {
    let token; 
    //lecture du jwt dans le cookie
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.utilisateur = await Utilisateur.findByPk(decoded.userId);
            
            next();
        }catch(e){
            console.log(e)
            res.status(401);
            throw new Error(`Vous n'etes pas autoriser, token obsolete`)
        }

    }else{
        res.status(401);
        throw new Error(`Vous n'etes pas autoriser, aucun token`)
    }
})

//CLIENT 
const client = (req, res, next) => {
    if(req.utilisateur && req.utilisateur.roleId ===1){
        next();
    }else{
        res.status(401);
        throw new Error("'Vous n'etes pas autoriser, not client")
    }
}

//ADMIN 
const admin = (req, res, next) => {
    if(req.utilisateur && req.utilisateur.roleId ===2){
        next();
    }else{
        res.status(401);
        throw new Error("'Vous n'etes pas autoriser, not admin")
    }
}

const livreur = (req, res, next) => {
    if(req.utilisateur && req.utilisateur.roleId ===3){
        next();
    }else{
        res.status(401);
        throw new Error("'Vous n'etes pas autoriser, not livreur")
    }
}

module.exports = {protect, admin, client, livreur}