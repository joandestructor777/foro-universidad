const pkg = require('pg');
const { Pool } = pkg;

const pool = new Pool({
    user:'postgres',
    password:'Aa1000604384',
    host:'localhost',
    database:'foro-universidad',
    port:5432
});

module.exports = { pool }