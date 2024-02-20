exports.success = function(req,res,mensage = '',status = 200){
    res.status(status).send({
        error : false,
        status : status,
        body :mensage
    })
}

exports.error = function(req,res,mensage ='Undefined Error',status = 500){
    res.status(status).send({
        error : false,
        status : status,
        body :mensage
    })
}