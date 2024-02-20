const{Schema,model} =require('mongoose');
const { DATE } = require('sequelize');

const logSchema=Schema({
    details:{
        type:String,  
        required:true  
    },
    date:{
        type:Date,
        required:true,
        default: new DATE()
    },
    request:{
        type:String,
        required:true
    }  
});



module.exports=model('Logs',logSchema);