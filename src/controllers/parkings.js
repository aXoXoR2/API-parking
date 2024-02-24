const {response,request}= require('express')
const Sequelize=require('sequelize')
const Op=Sequelize.Op
const {Parking}=require('../models/parkings')
const { Reserve } = require('../models/reserves')

const parkingGet= async(req=request,res=response)=>{
    try {
            const date=new Date()
        const reservations= await Reserve.findAll({where:{
            time_init:{
                [Op.lte]:date,
            },
            time_end:{
                [Op.gte]:date,
            }
        }})
        const parking=await Parking.findAll()
        let parkings_reservations={}
        parking.forEach(element => {
            parkings_reservations[element.dataValues['id']]=true
        });
        reservations.forEach(element => {
            parkings_reservations[element.dataValues['id_parking']]=false
        });
        res.status(201).json({
            parkings_reservations
        })
    } catch (error) {
            return res.status(401).json({
            error: error
          })
    }
}
const parkingPost=async(req=request,res=response)=>{
    try {
        const {description}=req.body
        const parking= new Parking({description})
        console.log(parking)
        await parking.save()
        res.status(201).json({
            parking
        })

        
    } catch (error) {
        return res.status(401).json({
            error: error
        })
    }
}
const parkingPut=async(req=request,res=response)=>{
    try {
        const {id}=req.params
        const parking=await Parking.findByPk(id)
        if(!parking){
            return res.status(400).json({
                msg:'This parking doesnt exist.'
            })
        }
        const {description}=req.body
        const result=await Parking.update({description},{where:{id}})
        const[ok]=result
        const ret=!!ok
        res.json({
            ret
        })
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
const parkingDelete=async(req=request,res=response)=>{
    try {
        const{id}=req.params
        const reserveId=await Reserve.findAll({where:{id_parking:id}})
        const length=reserveId.length
        if(length==0){
            const result=await Parking.destroy({where:{id}})
            const ret=result!==0
            return res.json({
                ret
            })
        }
        else
        {
            return res.status(400).json({
                msg: 'There are reservations in this parking.'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error:eror
        })
    }
}

module.exports={
    parkingGet,
    parkingPost,
    parkingPut,
    parkingDelete  
}

