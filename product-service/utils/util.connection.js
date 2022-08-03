'use strict';
const {Pool} = require('pg');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const config = {
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    password: process.env.PWD_DB,
    database: process.env.DB_NAME,
    port: process.env.PORT_DB
}

const db = new Pool(config);

module.exports = {db};