const mongoose=require('mongoose')
const {Logs} = require('../models/logs.js')

createMongoDb=async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ParkingLogs')
        console.log('Connection successfullly maked with logs database.');
        
    } catch (error) {
        console.log(error);
        throw new Error('Logs database connection error.')
    }
}      
module.exports = createMongoDb;