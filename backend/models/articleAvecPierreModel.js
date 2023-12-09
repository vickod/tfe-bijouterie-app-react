const Sequelize = require("sequelize");
const sequelize = require("../config/db_connection");

const ArticleAvecPierre = sequelize.define("articlesAvecPierres", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
},
  nbPierres: {
    type: Sequelize.INTEGER,
    allowNull: false

  },
  nbCarats: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
},{timestamps: false});

module.exports = ArticleAvecPierre;
