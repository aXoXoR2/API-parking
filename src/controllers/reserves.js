const {response,request}= require('express')
const Sequelize=require('sequelize')
const Op=Sequelize.Op
const { Reserve } = require('../models/reserves')
const {Parking}=require('../models/parkings')
const { User } = require('../models/users')
const Logs = require('../models/logs');

const reserveGet= async(req=request,res=response)=>{
    try {
        const ret=await Reserve.findAll()
        res.json({
            ret
        })
    } catch (error) {
        return res.status(400).json({
            error:error
        })
    }
}
const reservePost=async(req=request,res=response)=>{
    try {
        const {time_init,time_end,owner,vehicle_registration}=req.body
        if(time_end<=time_init){
            return res.status(400).json({
                msg:'Date start must be time before date end.'
            })
        }
        const reserver=await User.findByPk(owner)
        if(reserver===null ||!reserver.dataValues.status){
            return res.status(400).json({
                msg:'This user doesnt exist.'
            })
        }
        const aux1= await Reserve.findAll({where:{
            time_init:{
                [Op.gte]:time_init
            },
            time_end:{
                [Op.lte]:time_end
            }
        }})
        const aux2=await Reserve.findAll({where:{
            [Op.or]:[
                {
                    time_init:{
                        [Op.lte]:time_init,
                    },
                    time_end:{
                        [Op.gte]:time_init,
                    }
                },
                {
                    time_init:{
                        [Op.lte]:time_end,
                    },
                    time_end:{
                        [Op.gte]:time_end,
                    }
                }
            ]  
        }})
        const aux=[...aux1,...aux2]
        let reserved=false
        aux.forEach(element => {
            if(element.dataValues['vehicle_registration']==vehicle_registration){
                reserved=true
            }
        })
        if(reserved){
            return res.status(400).json({
                msg:'This reservation was already maked in other parking.'
            })
        }
        const parking=await Parking.findAll()
        let parking_assigment={}
        parking.forEach(element => {
            parking_assigment[element.dataValues['id']]=true
        });
        aux.forEach(element => {
            parking_assigment[element.dataValues['id_parking']]=false
        });
        let id_parking=-1
        for (const i in parking_assigment) {
            if(parking_assigment[i]){
                id_parking=i;
                break
            }
          }
        if(id_parking==-1){
            return res.status(400).json({
                msg:"It is not possible to asign this reservation at this moment. Please try later."
            })
        }
        const ret = new Reserve({id_parking,time_init,time_end,owner,vehicle_registration})
        await ret.save()
        const log= new Logs({details: "parking_id: "+id_parking.toString()+", time_start: "+ time_init.toString()+ ", time_end: "+ time_end.toString()+", user: "+ reserver.name.toString()+", vehicle: "+vehicle_registration.toString(),date:new Date(),request:"post"})
        await log.save()
        return res.status(200).json({
            ret
        })
    }catch (error) {
        return res.status(400).json({
            error : error
        })
    }
}
const reservePut=async(req=request,res=response)=>{
    try {
        const {id_parking,time_init,time_end}=req.query
        const {vehicle_registration}=req.body
        const reserved=await Reserve.findOne({where:{
            id_parking,
            time_init,
            time_end
        }})
        if(!reserved){
            return res.status(400).json({
                msg:'This reservation doesnt exist.'
            })
        }  
        const aux1= await Reserve.findAll({where:{
            time_init:{
                [Op.gte]:time_init
            },
            time_end:{
                [Op.lte]:time_end
            }
        }})
        const aux2=await Reserve.findAll({where:{
            [Op.or]:[
                {
                    time_init:{
                        [Op.lte]:time_init,
                    },
                    time_end:{
                        [Op.gte]:time_init,
                    }
                },
                {
                    time_init:{
                        [Op.lte]:time_end,
                    },
                    time_end:{
                        [Op.gte]:time_end,
                    }
                }
            ]  
        }})
        const aux=[...aux1,...aux2]
        let vehicle_reserved=false
        aux.forEach(element => {
            if(element.dataValues['vehicle_registration']==vehicle_registration){
                vehicle_reserved=true
            }
        })
        if(vehicle_reserved){
            return res.status(400).json({
                msg:'This vehicle already belong to this reservation.'
            })
        }  
        const result =await Reserve.update({vehicle_registration},{where:{id_parking,time_init,time_end}})
        const [ok]=result
        const ret=!!ok
        const log= new Logs({details: "parking_id: "+id_parking.toString()+", time_start: "+ time_init.toString()+ ", time_end: "+ time_end.toString()+", new_vehicle: "+vehicle_registration.toString(),date:new Date(),request:"put"})
        await log.save()
        return res.json(ret)

    } catch (error) {
        return res.status(400).json({
            error: error
        })
        
    }
}
const reserveDelete=async(req=request,res=response)=>{
    try {
        const {id_parking,time_init,time_end}=req.query
        const parking=await Parking.findByPk(id_parking)
        if(!parking){
            return res.status(400).json({
                msg:'Error in parkig request. Probably doesnt exist anymore.'
            })
        }
        const result=await Reserve.destroy({where:{id_parking,time_init,time_end}})
        const ret=result!==0
        const log= new Logs({details: "parking_id: "+id_parking.toString()+", time_start: "+ time_init.toString()+ ", time_end: "+ time_end.toString(),date:new Date(),request:"delete"})
        await log.save()
        return res.json({
            ret
        })
    } catch (error) {
        
        return res.status(400).json({
            error: error
        })
    }
}

module.exports={
    reserveGet,
    reservePost,
    reserveDelete,
    reservePut
}
