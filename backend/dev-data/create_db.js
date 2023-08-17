const dotenv = require("dotenv")
const Sequelize = require('sequelize')
dotenv.config({ path: "./config.env" })

//connexion
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT
});
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie !')
    return sequelize.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME};`)
  })
  .then(() => {
    console.log(`Base de données "${process.env.DB_NAME}" supprimée avec succès !`)
    return sequelize.query(`CREATE DATABASE ${process.env.DB_NAME};`)
  })
  .then(() => {
    console.log(`Base de données "${process.env.DB_NAME}" créée avec succès !`)
    sequelize.close()
  })
  .catch(err => {
    console.error('Erreur lors de la connexion à la base de données :', err)
  });

