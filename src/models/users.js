const {v4: uuidv4}=require('uuid')
const{DataTypes}= require('sequelize')
const{db}=require('../database/mysql.js')

const User=db.define(
    'User',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING(50),
            allowNull:false,
            unique:true
        },
        email:{
            type:DataTypes.STRING(),
            allowNull:false,
            unique:true
        },
        password_encrypted:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.INTEGER
        },
        role:{
            type:DataTypes.ENUM('ADMIN','CLIENT','EMPLOY'),
            allowNull:false
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        hooks:{
            afterSync: async()=>{
            const count=await User.count()
            if(count===0){
                await User.create(
                    {id:uuidv4(),
                    name:"Andry",
                    email:"andryrosquet@gmail.com",
                    password_encrypted:"$2a$10$9AtfWOusScIL8xxXwfjiu.3jYQ2xWNuzrcDenLbmLPXlpjbHbgXbG",
                    phone:"54782440",
                    role:"ADMIN"
                    ,status:true}) 
                }
            }
        },
        timestamps:false}
)
module.exports={
    User
}