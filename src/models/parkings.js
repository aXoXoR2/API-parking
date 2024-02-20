const{DataTypes}= require('sequelize')
const{db}=require('../database/mysql.js')

const Parking=db.define(
    'Parking',
    {
        id:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        description:{
            type:DataTypes.STRING
        }
        
    },
    {timestamps:false}
)
module.exports={
    Parking
}
