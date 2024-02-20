const { request, response } = require("express")

const haveRole=(...roles)=>{
    return(req,res=response,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:'Invalid role'
            })
        }
        next()
    }
}
module.exports={
    haveRole
}