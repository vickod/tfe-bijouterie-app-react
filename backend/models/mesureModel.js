const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const Mesure = sequelize.define('mesure', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    mesure: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    
},{timestamps: false})
module.exports = Mesure
