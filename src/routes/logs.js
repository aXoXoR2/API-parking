const {Router}= require('express')
const { logger } = require('../controllers/logs')
const { validateResult } = require('../middlewares/finalValidation')
const { validateJwt } = require('../middlewares/validateJwt')
const { haveRole } = require('../middlewares/validateRole')


const router=Router()
router.get('/',[
    validateJwt,
    haveRole('ADMIN'),
    validateResult
],logger)

module.exports=router