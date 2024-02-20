const {db}=require('./mysql.js')
const {User}=require('../models/users.js')
const {Parking}=require('../models/parkings.js')
const {Reserve}=require('../models/reserves.js')

const makeConection=({alter})=>{
    db.authenticate()
        .then(()=>console.log('Connection maked.'))
        .catch((err)=>{
            throw new Error(err)
        })
    db.sync({alter})
        .then(()=>console.log('Tables are created if doesnt exist.'))
        .catch((err)=>{
            throw new Error(err)
        })    
 }
module.exports={
    makeConection
}