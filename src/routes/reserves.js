const {Router}= require('express')
const {check}=require('express-validator')
const { reserveGet, reservePost, reserveDelete, reservePut } = require('../controllers/reserves')
const { validateResult } = require('../middlewares/finalValidation')
const { validateJwt } = require('../middlewares/validateJwt')
const { haveRole } = require('../middlewares/validateRole')

const router=Router()
router.get('/',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    validateResult
],reserveGet)

router.post('/',[
    validateJwt,
    haveRole('ADMIN','EMPLOY','CLIENT'),
    check('time_init','Invalid time_start.').isISO8601(),
    check('time_end','Invalid time_end.').isISO8601(),
    check('owner','Invalid user.').isUUID(),
    check('vehicle_registration','Invalid vehicle_registration').isString().isLength({max:8}),
    validateResult
],reservePost)

router.put('/',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    check('id_parking','Invalid parking_id.').isInt(),
    check('time_init','Invalid time_start.').isISO8601(),
    check('time_end','Invalid time_end.').isISO8601(),
    check('vehicle_registration','Invalid vehicle_registration.').isString().isLength({max:8}),
    validateResult
],reservePut)

router.delete('/',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    check('id_parking','Invalid parking_id.').isInt(),
    check('time_init','Invalid time_start.').isISO8601(),
    check('time_end','Invalid time_end.').isISO8601(),
    validateResult
],reserveDelete)

module.exports=router