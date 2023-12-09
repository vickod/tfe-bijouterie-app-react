const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");



const Article = sequelize.define('article', {
    id: {
        //type: Sequelize.UUID,
        //defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    prix: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    }
},{timestamps: false})
module.exports = Article
