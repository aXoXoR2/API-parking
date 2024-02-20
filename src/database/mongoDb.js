const mongoose=require('mongoose')
const {Logs} = require('../models/logs.js')
const config = require('../config.js')

createMongoDb=async()=>{
    try {
        await mongoose.connect(config.mongoHost)
        console.log('Connection successfullly maked with logs database.');
        
    } catch (error) {
        console.log(error);
        throw new Error('Logs database connection error.')
    }
}      
module.exports = {createMongoDb}