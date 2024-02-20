const router = require('express').Router();

// Routes
router.use('/user',require('./users.js'))
router.use('/parking',require('./parkings.js'))
router.use('/reserve',require('./reserves.js'))
router.use('/authentication',require('./authentication.js'))
router.use('/logs',require('./logs.js'))


module.exports = router;
