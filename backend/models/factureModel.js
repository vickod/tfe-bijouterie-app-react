const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const Facture = sequelize.define('facture', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    montant: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{timestamps: false})
module.exports = Facture

