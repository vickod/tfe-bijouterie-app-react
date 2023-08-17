const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const Taille = sequelize.define('taille', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    taille: {
        type: Sequelize.STRING,
        defaultValue: "taille unique",
        allowNull: false
    } 
},{timestamps: false})
module.exports = Taille
