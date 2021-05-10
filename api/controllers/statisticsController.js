const { request, response } = require('express')
const connection = require('../connection')

const recentAlbums = (request, response) => {
    connection.pool.query(`SELECT *, (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Album_Artist AA INNER JOIN Artist ART
    ON AA.artist_id = ART.id WHERE AA.album_id = A.id) X) AS artists FROM Album A
    WHERE launch_date <= CURRENT_DATE AND launch_date >= (CURRENT_DATE - INTERVAL '1 week')`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const popularArtists = (request, response) => {
    connection.pool.query(`SELECT * FROM Artist A INNER JOIN
    (SELECT SA.artist_id, COUNT(R.id) AS rep_por_artista FROM Reproduction R
    INNER JOIN Song_Artist SA ON R.song_id = SA.song_id
    WHERE rep_date >= (CURRENT_DATE - INTERVAL '3 month')
    GROUP BY SA.artist_id) B ON A.id = B.artist_id ORDER BY rep_por_artista DESC LIMIT 10`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const subscriptionCount = (request, response) => {
    connection.pool.query(`SELECT start_date_a_mes, COUNT(*) AS cantidad FROM (
    SELECT DATE_TRUNC('month', start_date) AS start_date_a_mes
    FROM Subscription
    WHERE start_date <= CURRENT_DATE AND start_date >= (CURRENT_DATE - INTERVAL '6 months')) A
    GROUP BY start_date_a_mes ORDER BY start_date_a_mes DESC`,
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

const popularGenres = (request, response) => {
    connection.pool.query(`SELECT G.id, G.name, COUNT(R.id) AS rep_por_genero
    FROM Reproduction R INNER JOIN Song_Genre SG ON R.song_id = SG.song_id
	INNER JOIN Genre G ON SG.genre_id = G.id
    WHERE rep_date >= (CURRENT_DATE - INTERVAL '3 month')
    GROUP BY G.id, G.name ORDER BY rep_por_genero DESC LIMIT 5`,
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

const salesByDate = (request, response) => {
    const dates = request.body.dates
    connection.pool.query(`SELECT * FROM sales_per_week
    WHERE week >= '${dates.startDate}' AND week <= '${dates.endDate}'`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const NartistSalesByDate = (request, response) => {
    const dates = request.body.dates
    const limit = request.body.limit
    connection.pool.query(`SELECT id, artistic_name, artist_id, SUM(sales) AS sales 
    FROM artist_sales_per_date X 
    WHERE rep_date >= '${dates.startDate}' AND rep_date <= '${dates.endDate}'
    GROUP BY id, artistic_name, artist_id ORDER BY sales DESC LIMIT ${limit}`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const genreSalesByDate = (request, response) => {
    const dates = request.body.dates
    connection.pool.query(`SELECT id, name, SUM(sales) AS sales
    FROM genre_sales_per_date
    WHERE date >= '${dates.startDate}' AND date <= '${dates.endDate}'
    GROUP BY id, name ORDER BY sales DESC`,
    (error, results) => {
        if (error) response.status(500).json({ message: error.detail })
        else response.status(200).json(results.rows)
    })
}

const mostPlayedSongsByArtist = (request, response) => {
    const artist_id = request.body.artist_id
    const limit = request.body.limit
    connection.pool.query(`SELECT id, name, duration_ms, active, cover, album, album_id, count,
    (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Song_Artist SA INNER JOIN Artist A
    ON SA.artist_id = A.id WHERE SA.song_id = B.id) X) AS artists
    FROM song_reproduction_count_by_artist B 
    WHERE B.artist_id = '${artist_id}' ORDER BY count DESC LIMIT ${limit}`,
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
    salesByDate,
    NartistSalesByDate,
    genreSalesByDate,
    mostPlayedSongsByArtist,
}