const {Router}= require('express')
const {check}=require('express-validator')
const { parkingGet, parkingPost, parkingPut, parkingDelete} = require('../controllers/parkings')
const { validateResult } = require('../middlewares/finalValidation')
const { validateJwt } = require('../middlewares/validateJwt')
const { haveRole } = require('../middlewares/validateRole')

const router=Router()
router.get('/',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    validateResult
],parkingGet)

router.post('/',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    check('description','').isString(),
    validateResult
],parkingPost)

router.put('/:id',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    check('description','').isString(),
    validateResult
],parkingPut)

router.delete('/:id',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    validateResult
],parkingDelete)

module.exports=router