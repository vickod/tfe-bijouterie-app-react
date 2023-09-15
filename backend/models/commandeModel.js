const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");

const Commande = sequelize.define('commande', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    orderAt:{
        type: Sequelize.DATE,
        default: Date.now(),
        allowNull: false
    },
    total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    isPaid:{
        type :Sequelize.BOOLEAN ,
        allowNull:false,
        defaultValue: false
    },
    paidAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    isDelivered: {
        type:Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    deliveredAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    methodeDePayement: {
        type: Sequelize.STRING,
        allowNull: true
    },
    premiereCommande: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},{timestamps: true})
module.exports = Commande

