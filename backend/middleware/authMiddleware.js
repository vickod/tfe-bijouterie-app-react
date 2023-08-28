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

//ADMIN 
const admin = (req, res, next) => {
    if(req.utilisateur && req.utilisateur.roleId ===2){
        next();
    }else{
        res.status(401);
        throw new Error("'Vous n'etes pas autoriser, not admin")
    }
}

module.exports = {protect, admin}