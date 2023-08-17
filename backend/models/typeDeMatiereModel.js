const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const TypeDeMatiere = sequelize.define('typeDeMatiere', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    matiere: {
        type: Sequelize.STRING,
        allowNull: false
    } 
},{timestamps: false})
module.exports = TypeDeMatiere
