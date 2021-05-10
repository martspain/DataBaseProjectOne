const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const account = require('./controllers/accountController')
const { getAlbums, getAlbum, createAlbum } = require('./controllers/albumController')
const { getArtist, createArtist } = require('./controllers/artistController')
const { createManager } = require('./controllers/managerController')
const { createPlaylist, getPlaylists } = require('./controllers/playlistController')
const { search, searchArtist } = require('./controllers/searchController')
const song = require('./controllers/songController')
const subscription = require('./controllers/subscriptionController')
const { verifyToken, verifyArtist, verifySubscription, verifyManager } = require('./verificator')
const {
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
} = require('./controllers/statisticsController')
const { createReproduction, accountReproductions } = require('./controllers/reproductionController')
const { getGenre } = require('./controllers/genreController')

const corsOptions = {
    origin: ['http://localhost:8080']
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
/* verifica el token de refresco y genera un nuevo token de acceso */
app.post('/refreshToken', account.generateRefreshToken)
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
app.post('/search', verifyToken, search)
/* Busca por nombre de artista */
app.post('/search/artists', verifyToken, searchArtist)
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
/* Ventas por semana segun la fecha de inicio y final indicada */
app.post('/statistics/salesByDate', verifyToken, verifyManager, salesByDate)
/* Artistas con mayores ventas en un rango de fechas y limite de artistas dados */
app.post('/statistics/NartistSalesByDate', verifyToken, verifyManager, NartistSalesByDate)
/* Ventas por genero dado un rango de fechas */
app.post('/statistics/genreSalesByDate', verifyToken, verifyManager, genreSalesByDate)
/* Las N canciones mas reproducidas de un artista dado */
app.post('/statistics/mostPlayedSongsByArtist', verifyToken, verifyManager, mostPlayedSongsByArtist)
/* Cambia el estado boolean de active para una cancion especifica */
app.put('/songs/changeActive', verifyToken, verifyManager, song.changeActiveSong)
/* Obtener playlists de un usuario especifico*/
app.get('/playlists/:id', verifyToken, verifySubscription, getPlaylists) 
/* Crea una reproduccion de una cancion por un usuario */
app.post('/reproduction/:id', verifyToken, createReproduction)
/* Devuelve la cantidad de reproducciones de un usuario */
app.get('/reproduction/accountReproductions', verifyToken, accountReproductions)
/* Obtiene todas las canciones de un genero */
app.get('/genres/:id', verifyToken, getGenre)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})