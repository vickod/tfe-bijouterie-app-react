const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const TypeDePierre = sequelize.define('typeDePierre', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },{timestamps: false});

  module.exports = TypeDePierre