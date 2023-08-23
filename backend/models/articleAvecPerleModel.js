const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const ArticleAvecPerle = sequelize.define('articlesAvecPerles', {
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
module.exports = ArticleAvecPerle