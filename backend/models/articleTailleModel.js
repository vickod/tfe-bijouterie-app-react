const Sequelize = require("sequelize");
const sequelize = require("../config/db_connection");

const ArticleTaille = sequelize.define("articleTaille",{
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
  },{ timestamps: false });

module.exports = ArticleTaille;
