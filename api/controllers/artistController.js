const { request, response } = require('express')
const connection = require('../connection')

const getArtist = (request, response) => {
    const id = request.params.id
    connection.pool.query(`SELECT *, (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT id,name,preview_url,launch_date FROM Album_Artist AA INNER JOIN Album ALB
    ON AA.album_id = ALB.id WHERE AA.artist_id = A.id) X) AS albums FROM Artist A
    WHERE A.id = '${id}'`,
    (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getArtist,
}