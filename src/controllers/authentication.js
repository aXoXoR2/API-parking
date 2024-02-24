const {response,request}= require('express')
const bcryptjs=require('bcryptjs');
const { User } = require('../models/users');
const { createJwt } = require('../tokenGenerator');

const login=async(req,res=response)=>{
    const{email,password}=req.body
    try {
        const user= await User.findOne({where:{email}})

        if(!user){
            return res.json({
                error:'There is not user with this email.'
            })
        }
        if(!user.status){
            return res.json({
                error:'Status error.'
            })
        }
        const matchPassword=bcryptjs.compareSync(password,user.password_encrypted)
        if(!matchPassword){
            return res.json({
                error:"Password incorret."
            })
        }

        const token=await createJwt(user)

        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            msg:'Unknown error.',
            error : error    
        })
    }
}

module.exports={
    login
}