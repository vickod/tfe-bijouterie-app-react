const Sequelize = require("sequelize");
const sequelize = require("../config/db_connection");

const Utilisateur = sequelize.define('utilisateur',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
    },
    prenom: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: true,
        isNumeric: true
    },
    adresse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

},{timestamps: true})
module.exports = Utilisateur;


