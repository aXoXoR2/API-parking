const { response,request } = require('express');

const Logs = require('../models/logs');

const logger= async(req=request,res=response)=>{ 
    const ret= await Logs.find()
    res.json({
        ret
    })
}
module.exports={
    logger
}