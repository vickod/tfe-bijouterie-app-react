const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const CollierEtChaineAvecPerle = sequelize.define('collierEtChaineAvecPerle', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    nbPerles: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{timestamps: false})
module.exports = CollierEtChaineAvecPerle