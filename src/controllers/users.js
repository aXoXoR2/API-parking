const {response,request}= require('express')
const bcryptjs=require('bcryptjs');
const {v4: uuidv4}=require('uuid')
const {User}=require('../models/users')

const userGet= async(req=request,res=response)=>{
    try {
        const users=await User.findAll({where:{status:true}})
        res.json({
            users
        })
    } catch (error) {
        return res.status(400).json({
            error:error
        })     
    }
}
const userPost=async(req=request,res=response)=>{
    try {
        const {name,email,password,phone,role}=req.body
        const match_email=await User.findOne({where:{email}})
        if(match_email){
            return res.status(400).json({
                msg:'This email already exist.'
            })
        }
        const password_encrypted= bcryptjs.hashSync(password, bcryptjs.genSaltSync())
        console.log(password_encrypted)
        const user= new User({id:uuidv4(), name, email, password_encrypted, phone, role, status:true})
        console.log(user)
        await user.save()
        console.log("ENTER OK")
        res.status(200).json({
            user
        })
    } catch (error) {
        console.log("ENTER Error")
        return res.status(400).json({      
            error:error
        })    
    }
}
const userPut=async(req=request,res=response)=>{
    try {
        const {id}=req.params
        const user=await User.findByPk(id)
        if(!user){
            return res.status(400).json({
                msg:'This user doesnt exist.'
            })
        }
        const {name,phone,role}=req.body
        const result=await User.update({name,phone,role},{where:{id}})
        const [ok]=result
        const ret=!!ok
        res.json({
            ret
        })
    } catch (error) {
        return res.status(400).json({
            error:error
        })
    }  
}
const userDelete=async(req=request,res=response)=>{
    try {
        const {id}=req.params
        const user=await User.findByPk(id)     
        if(!user){
            return res.status(400).json({
                msg:'User wasnt found.'
            })
        }
        const result=await User.update({status:false},{where:{id}})
        const [ok]=result
        const ret=!!ok
        res.json({
            ret
        })
    } catch (error) {
        return res.status(400).json({
            error:error
        })
    }
}

module.exports={
    userGet,
    userPost,
    userPut,
    userDelete
}

