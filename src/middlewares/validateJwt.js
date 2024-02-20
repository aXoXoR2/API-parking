const { response, request } = require('express')
const jwt= require('jsonwebtoken')
const {User}=require('../models/users')
const config = require('../config')


const validateJwt=async(req=request,res=response,next)=>{
    const token = req.header('token')
    if(!token){
        return res.status(400).json({
            msg:"Non recieve a token."
        })
    }
    try {
        const {uuid}=jwt.verify(token, config.privatekey)
        const user=await User.findOne({where:{id:uuid}})
        if(!user){
            return res.status(400).json({
                msg:"Invalid token."
            })
        }
        if(!user.status){
            return res.status(401).json({
                msg:"Status error."
            })
        }
        req.user=user
      
        next()
    } catch (error) {
        return res.status(400).json({
            msg:"Token expired."
        })
    }
}
module.exports={
    validateJwt
}