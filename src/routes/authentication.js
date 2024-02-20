const {Router}= require('express')
const {check}=require('express-validator')
const { validateResult } = require('../middlewares/finalValidation')
const { login } = require('../controllers/authentication')


const router=Router()
router.post('/',[
    check('email','This email doesnt exist.').isEmail(),
    check('password','Password must have more than six characters.').isString().isLength({min:6}),
    validateResult
],login)


module.exports=router