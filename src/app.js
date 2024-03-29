const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser')
const app = express();

// DataBase
const {makeConection} = require('./database/db')
makeConection({alter:false})

const{createMongoDb} = require('./database/mongoDb')
createMongoDb()

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true}));

// Routes
app.use('/api',require('./routes/routesHandler'))

// Configuration
app.set('port', config.app.port);


module.exports = app