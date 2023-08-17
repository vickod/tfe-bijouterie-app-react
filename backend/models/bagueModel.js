const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db_connection");

const Bague = sequelize.define('bague', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    articleId: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    }      
},{
    timestamps: false, 
})
module.exports = Bague

