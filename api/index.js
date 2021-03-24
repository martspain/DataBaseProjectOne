const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const account = require('./controllers/accountController')
const { getAlbums, getAlbum, createAlbum } = require('./controllers/albumController')
const { getArtist, createArtist } = require('./controllers/artistController')
const { createManager } = require('./controllers/managerController')
const { createPlaylist } = require('./controllers/playlistController')
const { search } = require('./controllers/searchController')
const song = require('./controllers/songController')
const subscription = require('./controllers/subscriptionController')
const { verifyToken, verifyArtist, verifySubscription, verifyManager } = require('./verificator')
const { recentAlbums, popularArtists, subscriptionCount, largestProductionArtists, popularGenres, activeAccounts } = require('./controllers/statisticsController')

const corsOptions = {
    origin: 'http://localhost:8080'
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
/* Recibe la cuenta en el body como Account */
app.post('/signup', account.createAccount)
/* Devuelve el token */
app.post('/login', account.login)
/* Suscripcion por mes a la cuenta segun token */
app.post('/subscribe', verifyToken, subscription.subscribe)
/* Todas las canciones y sus artistas */
app.get('/songs', verifyToken, song.getSongs)
/* Crea una cancion del artista */
app.post('/songs', verifyToken, verifyArtist, song.createSong)
/* Todos los albumes con sus artistas y canciones (y artistas de canciones) */
app.get('/albums', verifyToken, getAlbums)
/* Crea un album para el artista */
app.post('/albums', verifyToken, verifyArtist, createAlbum)
/* Album con sus artistas y canciones (y artistas de canciones) */
app.get('/albums/:id', verifyToken, getAlbum)
/* Crea un artista para el usuario logeado */ 
app.post('/artists', verifyToken, createArtist)
/* Artista y sus albumes */
app.get('/artists/:id', verifyToken, getArtist)
/* Busca por nombre de cancion, nombre de artista, nombre de album y genero */
app.get('/search', verifyToken, search)
/* Crea una playlist del usuario */
app.post('/playlists', verifyToken, verifySubscription, createPlaylist)
/* Crea un manager para el usuario logeado */
app.post('/manager', verifyToken, createManager)
/* Obtener álbumes más recientes de la ultima semana */
app.get('/statistics/recentAlbums', verifyToken, verifyManager, recentAlbums)
/* Artistas con popularidad creciente en los ultimos 3 meses */
app.get('/statistics/popularArtists', verifyToken, verifyManager, popularArtists)
/* Cantidad de nuevas subscripciones mensuales durante los ultimos 6 meses */
app.get('/statistics/subscriptionCount', verifyToken, verifyManager, subscriptionCount)
/* Artistas con mayor produccion musical */
app.get('/statistics/largestProductionArtists', verifyToken, verifyManager, largestProductionArtists)
/* Generos más populares */
app.get('/statistics/popularGenres', verifyToken, verifyManager, popularGenres)
/* Usuarios más activos en la plataforma */
app.get('/statistics/mostActiveAccounts', verifyToken, verifyManager, activeAccounts)
/* Cambia el estado boolean de active para una cancion especifica */
app.put('/songs/changeActive', verifyToken, verifyManager, song.changeActiveSong)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})