const Sequelize = require("sequelize");
const sequelize = require("../config/db_connection");

const Categorie = sequelize.define('categorie',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
      }
},{timestamps: false})
module.exports = Categorie;

