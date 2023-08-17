const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const LigneDeCommande = sequelize.define('ligne_de_commande', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    quantite: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    prix: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{timestamps: false})
module.exports = LigneDeCommande
