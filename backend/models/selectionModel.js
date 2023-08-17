const Sequelize = require("sequelize");
const sequelize = require("../config/db_connection");

const Selection = sequelize.define('selection',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
},{timestamps: false})
module.exports = Selection;














/*
class Selection extends Model {}
Selection.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: STRING,
            allowNull: false
          },
    },
    { sequelize: sequelize, modelName: "Selection" }
)
    module.exports = Selection;
*/