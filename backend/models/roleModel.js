const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const Role = sequelize.define('role', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'client'
    }
},{timestamps: false})
module.exports = Role


