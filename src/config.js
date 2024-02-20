require('dotenv').config();

module.exports = {
    app : {
        port: process.env.PORT || 4000,
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        databaseName: process.env.MYSQL_DB || 'parking',
        database : process.env.DATABASE || 'mysql'
    },
    privatekey :process.env.PRIVATEKEY
}