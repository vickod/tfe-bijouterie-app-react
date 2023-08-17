const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const TypeDePerle = sequelize.define('typeDePerle', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
},{timestamps: false})
module.exports = TypeDePerle