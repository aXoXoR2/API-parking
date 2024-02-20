const moment = require('moment');
const jwtSimple = require('jwt-simple');
const config = require('./config');

const createJwt = (user) =>{
    const payload = {
        userid: user.id,
        createdAt : moment().unix(),
        expiredAt : moment().add(5, 'hours').unix()
    }
    return jwtSimple.encode(payload, config.privatekey);
}

module.exports = {createJwt}