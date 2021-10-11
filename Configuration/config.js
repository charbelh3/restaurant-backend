const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    connectionString: process.env.CONNECTION_STRING,
    appSecret : process.env.APP_SECRET
};