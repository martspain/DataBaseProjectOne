const { request, response } = require('express')
const connection = require('../connection')

const recentAlbums = (request, response) => {
    connection.pool.query(`SELECT * FROM Album
    WHERE launch_date <= CURRENT_DATE AND launch_date >= (CURRENT_DATE - INTERVAL '1 week')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

/* TODO: Hacer query */
const popularArtists = (request, response) => {
    response.status(200).json({message:'mostrar artistas populares'})
}

const subscriptionCount = (request, response) => {
    connection.pool.query(`SELECT start_date_a_mes, COUNT(*) AS cantidad FROM (
    SELECT DATE_TRUNC('month', start_date) AS start_date_a_mes
    FROM Subscription
    WHERE start_date <= CURRENT_DATE AND start_date >= (CURRENT_DATE - INTERVAL '6 months')) A
    GROUP BY start_date_a_mes`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const largestProductionArtists = (request, response) => {
    connection.pool.query(`SELECT id,artistic_name,canciones_por_artista
    FROM (SELECT artist_id, COUNT(*) AS canciones_por_artista
	FROM song_artist GROUP BY artist_id) X
	INNER JOIN Artist A ON X.artist_id = A.id
	ORDER BY canciones_por_artista DESC LIMIT 10`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

/* TODO: cambiar por reproducciones */
const popularGenres = (request, response) => {
    connection.pool.query(`SELECT G1.name, COUNT(*) AS rep_por_genero
    FROM Song_Genre S1 JOIN Genre G1 ON S1.genre_id = G1.id
    GROUP BY S1.genre_id, G1.name ORDER BY rep_por_genero DESC LIMIT 10`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const activeAccounts = (request, response) => {
    connection.pool.query(`SELECT X.username, A.first_name, cantidad_reproducciones
    FROM (SELECT username, COUNT(*) AS cantidad_reproducciones FROM Reproduction
    WHERE rep_date >= (CURRENT_DATE - INTERVAL '1 month') GROUP BY username) X
    INNER JOIN Account A ON X.username = A.username
    ORDER BY cantidad_reproducciones DESC LIMIT 10`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

module.exports = {
    recentAlbums,
    popularArtists,
    subscriptionCount,
    largestProductionArtists,
    popularGenres,
    activeAccounts,
}