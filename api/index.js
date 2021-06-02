const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const account = require('./controllers/accountController')
const { getAlbums, getAlbum, createAlbum, updateAlbum } = require('./controllers/albumController')
const { getArtist, createArtist, getArtistsAccounts, deactivateArtist } = require('./controllers/artistController')
const { createManager } = require('./controllers/managerController')
const { createPlaylist, getPlaylists } = require('./controllers/playlistController')
const { search, searchArtist } = require('./controllers/searchController')
const song = require('./controllers/songController')
const subscription = require('./controllers/subscriptionController')
const {
    verifyToken,
    verifyArtist,
    verifySubscription,
    verifyManager,
    verifyMonitorA,
    verifyMonitorB,
} = require('./verificator')
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
const { createReproduction, accountReproductions, generateReproductions } = require('./controllers/reproductionController')
const { getGenre } = require('./controllers/genreController')
const { getNoMonitors, createMonitor } = require('./controllers/monitorController')
const { getBinnacle } = require('./controllers/binnacleController')
const { migrateRepsPerDate, getLastUpdate, recommend, recommendRandom } = require('./controllers/migrationController')

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
/* Obtiene los nombres de usuario de todos los usuarios */
app.get('/users', verifyToken, verifyManager, account.getAllUsers)
/* Suscripcion por mes a la cuenta segun token */
app.post('/subscription/subscribe', verifyToken, subscription.subscribe)
/* Devuelve las cuentas que no tienen suscripcion */
app.get('/subscription/nonSubscribedAccounts', verifyToken, verifyMonitorA, subscription.nonSubscribedAccounts)
/* Devuelve las cuentas que tienen suscripcion activa */
app.get('/subscription/subscribedAccounts', verifyToken, verifyMonitorA, subscription.subscribedAccounts)
/* Cambia el estado de activo de una cuenta sin subscripcion y agrega a la bitacora*/
app.put('/subscription/deactivateNonSubscribed', verifyToken, verifyMonitorA, subscription.deactivateNonSubscribed)
/* Elimina una suscripcion y agrega a la bitacora */
app.put('/subscription/removeSubscription', verifyToken, verifyMonitorA, subscription.removeSubscription)
/* Todas las canciones y sus artistas */
app.get('/songs', verifyToken, song.getSongs)
/* Crea una cancion del artista */
app.post('/songs', verifyToken, verifyArtist, song.createSong)
/* Actualiza una cancion y agrega a la bitacora */
app.put('/songs', verifyToken, verifyMonitorA, song.updateSong)
/* Todos los albumes con sus artistas y canciones (y artistas de canciones) */
app.get('/albums', verifyToken, getAlbums)
/* Crea un album para el artista */
app.post('/albums', verifyToken, verifyArtist, createAlbum)
/* Album con sus artistas y canciones (y artistas de canciones) */
app.get('/albums/:id', verifyToken, getAlbum)
/* Actualiza un album y agrega a la bitacora */
app.put('/albums', verifyToken, verifyMonitorA, updateAlbum)
/* Crea un artista para el usuario logeado */ 
app.post('/artists', verifyToken, createArtist)
/* Obtiene todas las cuentas de los usuarios que son artistas */
/* Esta tiene que ir antes de /artists/:id para que no haya conflicto */
app.get('/artists/accounts', verifyToken, verifyMonitorB, getArtistsAccounts)
/* Artista y sus albumes */
app.get('/artists/:id', verifyToken, getArtist)
/* Cambia el estado de activo de un Artista, en consecuencia albumes y canciones y agrega a bitacora */
app.put('/artists/deactivateArtist', verifyToken, verifyMonitorB, deactivateArtist)
/* Busca por nombre de cancion, nombre de artista, nombre de album y genero */
app.post('/search', verifyToken, search)
/* Busca por nombre de artista */
app.post('/search/artists', verifyToken, searchArtist)
/* Crea una playlist del usuario */
app.post('/playlists', verifyToken, verifySubscription, createPlaylist)
/* Crea un manager para el usuario logeado */
app.post('/manager', verifyToken, createManager)
/* Obtener álbumes más recientes de la ultima semana */
app.get('/statistics/recentAlbums', verifyToken, verifyMonitorB, recentAlbums)
/* Artistas con popularidad creciente en los ultimos 3 meses */
app.get('/statistics/popularArtists', verifyToken, verifyMonitorB, popularArtists)
/* Cantidad de nuevas subscripciones mensuales durante los ultimos 6 meses */
app.get('/statistics/subscriptionCount', verifyToken, verifyMonitorB, subscriptionCount)
/* Artistas con mayor produccion musical */
app.get('/statistics/largestProductionArtists', verifyToken, verifyMonitorB, largestProductionArtists)
/* Generos más populares */
app.get('/statistics/popularGenres', verifyToken, verifyMonitorB, popularGenres)
/* Usuarios más activos en la plataforma */
app.get('/statistics/mostActiveAccounts', verifyToken, verifyMonitorB, activeAccounts)
/* Ventas por semana segun la fecha de inicio y final indicada */
app.post('/statistics/salesByDate', verifyToken, verifyMonitorB, salesByDate)
/* Artistas con mayores ventas en un rango de fechas y limite de artistas dados */
app.post('/statistics/NartistSalesByDate', verifyToken, verifyMonitorB, NartistSalesByDate)
/* Ventas por genero dado un rango de fechas */
app.post('/statistics/genreSalesByDate', verifyToken, verifyMonitorB, genreSalesByDate)
/* Las N canciones mas reproducidas de un artista dado */
app.post('/statistics/mostPlayedSongsByArtist', verifyToken, verifyMonitorB, mostPlayedSongsByArtist)
/* Obtener playlists de un usuario especifico*/
app.get('/playlists/:id', verifyToken, verifySubscription, getPlaylists)
/* Genera reproducciones de manera aleatoria segun la cantidad y fechas indicadas */
app.post('/reproduction/generateReproductions', verifyToken, verifyManager, generateReproductions)
/* Crea una reproduccion de una cancion por un usuario */
app.post('/reproduction/:id', verifyToken, createReproduction)
/* Devuelve la cantidad de reproducciones de un usuario */
app.get('/reproduction/accountReproductions', verifyToken, accountReproductions)
/* Obtiene todas las canciones de un genero */
app.get('/genres/:id', verifyToken, getGenre)
/* Obtiene los usuarios que no son monitores */
app.get('/monitors/noMonitors', verifyToken, verifyMonitorB, getNoMonitors)
/* Crea un monitor del tipo dado */
app.post('/monitors', verifyToken, verifyMonitorB, createMonitor)
/* Devuelve toda la bitacora ordenada por fecha de registro */
app.get('/binnacle', verifyToken, verifyMonitorB, getBinnacle)
/* Migra las reproducciones de una fecha dada, de postgres a mongo */
app.post('/migrate/repsPerDate', verifyToken, verifyManager, migrateRepsPerDate)
/* Devuelve la fecha de la ultima modificacion de la coleccion de reproducciones por usuario por fecha */
app.get('/migrate/lastUpdate', verifyToken, verifyManager, getLastUpdate)
/* Devuelve 10 recomendaciones de canciones para usuario */
app.get('/migrate/recommend/:id', verifyToken, verifyManager, recommend)
app.get('/migrate/recommend/', verifyToken, verifyManager, recommendRandom)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})