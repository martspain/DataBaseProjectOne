const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'spofity',
    password: '123',
    port: 5432,
})

const getAccounts = (request, response) => {
    pool.query('SELECT * FROM Account', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getAccounts
}