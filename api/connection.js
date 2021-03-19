const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'spofity',
    password: '123',
    port: 5432,
})

pool.query('', (error, results) => {
    results
})

module.exports = { pool }