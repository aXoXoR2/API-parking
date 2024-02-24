const { response, request } = require('express')
const jwt= require('jwt-simple');
const moment = require('moment');
const {User}=require('../models/users');
const config = require('../config')


const validateJwt=async(req=request,res=response,next)=>{
    const token = req.header('token')
    
    if(!token){
        return res.status(403).json({
            msg:"Non recieve a token. Unahuthorized."
        })
    }
    let payload = {}
    try {
        payload = jwt.decode(token, config.privatekey);
        if(payload.expiredAt < moment().unix())
        {
            return res.status(401).json({
                msg:"Expired Token."
            })
        }
        const uuid= payload.userid;
        const user=await User.findOne({where:{id:uuid}})

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            msg:"Invalid Token."
        })
    }
}
module.exports={
    validateJwt
}