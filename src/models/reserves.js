const{DataTypes}= require('sequelize')
const{db}=require('../database/mysql.js')
const { Parking } = require('./parkings.js')
const { User } = require('./users.js')


const Reserve=db.define(
    'Reserve',
    {
        id_parking:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            references:{
                model :Parking,
                key:'id'
            }      
        },
        time_init:{
            type:DataTypes.DATE,
            allowNull:false,
            primaryKey:true
        },
        time_end:{
            type:DataTypes.DATE,
            allowNull:false,
            primaryKey:true
        },
        owner:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model: User,
                key:'id'
            }
        },
        vehicle_registration:{
            type:DataTypes.STRING(8),
            allowNull:false,
            primaryKey:true
        }        
    },
    {timestamps:false}
)
module.exports={
    Reserve
}
