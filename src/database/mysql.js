const {Sequelize}= require('sequelize')
const config = require('../config')

 const db=new Sequelize(config.mysql.databaseName, config.mysql.user, config.mysql.password, {
    dialect: config.mysql.database,
    host: config.mysql.host
 })
 module.exports={
    db
 }
