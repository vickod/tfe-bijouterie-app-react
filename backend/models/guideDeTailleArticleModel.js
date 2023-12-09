const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const GuideDeTailleArticle = sequelize.define('guideDeTailleArticle', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    valeur_mesure: {
        type: Sequelize.STRING,
        allowNull: true
    },
    unite_mesure: {
        type: Sequelize.STRING,
        allowNull: true
    } 
},{timestamps: false})
module.exports = GuideDeTailleArticle
