const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    });
sequelize.authenticate()
    .then(_ => console.log(`connexion a la db ${process.env.DB_NAME} reussi`))
    .catch(error => console.log(error))

module.exports = sequelize;    