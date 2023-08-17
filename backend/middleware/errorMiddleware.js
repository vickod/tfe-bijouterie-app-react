const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

//capture l'erreur des routes inexistantes (url)
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

//capture tous types d'erreurs generer par l'app
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === "ObjectId" ) {
        message = "Resource not found";
        statusCode = 404;
    }
    res.status(statusCode).json({
        message, 
        stack: process.env.NODE_ENV === "production" ? 'mode production :(' : err.stack,
    });
};

module.exports = {
    notFound , errorHandler
};
