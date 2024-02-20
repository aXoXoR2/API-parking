const {router}= require('express').Router();
const {check}=require('express-validator')
const { userGet,userPost, userDelete, userPut } = require('../controllers/users')
const { validateResult} = require('../middlewares/finalValidation')
const { validateJwt } = require('../middlewares/validateJwt')
const { haveRole } = require('../middlewares/validateRole')


router.get('/',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    validateResult
],userGet)

router.post('/',[
    validateJwt,
    haveRole('ADMIN','EMPLOY'),
    check('name','Please enter a name.').isString().notEmpty(),
    check('email','This email doesnt exist.').isEmail(),
    check('password','The password must have more than 6 characters').isString().isLength({min:6}),
    check('phone','').isNumeric(),
    check('role','This role doesnt exist.').isIn(['ADMIN','CLIENT','EMPLOY']),
    validateResult
],userPost)

router.put('/:id',[
    validateJwt,
    haveRole('ADMIN'),
    check('name','Name is not null').isString().notEmpty(),
    check('phone','').isNumeric().isLength({min:8}),
    check('role','this role is not valid').isIn(['ADMIN','CLIENT','EMPLOY']),
    validateResult
],userPut)

router.delete('/:id',[
    validateJwt,
    haveRole('ADMIN'),
    validateResult
],userDelete)


module.exports=router