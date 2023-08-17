const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const CollierEtChaine = sequelize.define('collierEtChaine', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    fermeture: {
        type: Sequelize.STRING,
        allowNull: false
    },
    motif: {
        type: Sequelize.STRING,
        defaultValue: "sans motif",
        allowNull: true,
    }
},{timestamps: false})
module.exports = CollierEtChaine