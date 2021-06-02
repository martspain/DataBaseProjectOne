const { request, response } = require('express')
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')
const connection = require('../connection')
require('../mongoConnection')

const reproductionsPerDateSchema = new Schema({
    username: String,
    reproductions: Schema.Types.Mixed
})

const ReproductionPerDate = model('Reproductions', reproductionsPerDateSchema, 'reproductionsPerDate')

const lastUpdateSchema = new Schema({ lastUpdate: String })

const LastUpdate = model('LastUpdate', lastUpdateSchema, 'reproductionsPerDate')

const getLastUpdate = (request, response) => {
    LastUpdate.findOne({ lastUpdate: { $exists: true } }).then((lastUpdate) => {
        if (lastUpdate) {
            response.status(200).json(lastUpdate)
        } else {
            response.status(200).json({ lastUpdate: 'There is no data migrated yet' })
        }
    }).catch((error) => response.status(500).json({ message: 'Error al verificar la base de datos MongoDB' }))
}

const migrateRepsPerDate = (request, response) => {
    const endDate = request.body.date
    LastUpdate.findOne({ lastUpdate: { $exists: true } }).then((lastUpdate) => {
        let date = ''
        if (lastUpdate) {
            date = lastUpdate.lastUpdate
        } else {
            date = '1995-01-01'
        }
        connection.pool.query(`SELECT username, (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM (
            SELECT rep_date, (SELECT ARRAY_AGG(ROW_TO_JSON(Y)) FROM (
                SELECT R3.id AS rep_id, R3.song_id, S.name, S.duration_ms, S.album_id, 
                A.name AS album_name, A.preview_url, A.launch_date, 
                SG.genre_id, G.name AS genre,
                (SELECT ARRAY_AGG(ROW_TO_JSON(Z)) FROM
                (SELECT artist_id, artistic_name FROM Song_Artist SA INNER JOIN Artist ART
                ON SA.artist_id = ART.id WHERE SA.song_id = S.id) Z) AS artists
                FROM Reproduction R3 INNER JOIN Song S ON R3.song_id = S.id 
                INNER JOIN Album A ON S.album_id = A.id
                INNER JOIN Song_Genre SG ON S.id = SG.song_id
                INNER JOIN Genre G ON SG.genre_id = G.id
                WHERE R2.rep_date = R3.rep_date AND R1.username = R3.username	
            ) Y) AS songsPlayed FROM Reproduction R2 
            WHERE R1.username = R2.username AND rep_date > '${date}' AND rep_date <= '${endDate}' GROUP BY rep_date
        ) X) AS reproductions FROM Reproduction R1 WHERE rep_date > '${date}' AND rep_date <= '${endDate}' GROUP BY username`,
        (error, results) => {
            if (error) response.status(500).json({ message: error.detail })
            else {
                if (results.rows.length === 0) {
                    response.status(200).json({ message: `Everything is up to date` })
                } else {
                    ;(async () => {
                        let updated = 0
                        let inserted = 0
                        for await (const account of results.rows) {
                            await ReproductionPerDate.findOne({ username: account.username }).then((exists) => {
                                if (exists) {
                                    ReproductionPerDate.findOneAndUpdate({ username: account.username }, { $push: { reproductions: { $each: account.reproductions } } }).catch((error) => {
                                        throw error
                                    })
                                    updated++
                                } else {
                                    const newReproductionPerDate = new ReproductionPerDate(account)
                                    newReproductionPerDate.save().catch((error) => {
                                        throw error
                                    })
                                    inserted++
                                }
                            }).catch((error) => {
                                console.log(error)
                                response.status(500).json({ message: 'Error al migrar las reproducciones a MongoDB' })
                            })
                        }
                        LastUpdate.findOneAndUpdate({ lastUpdate: { $exists: true } }, { lastUpdate: endDate }, { new: true }).then((dateInserted) => {
                            if (dateInserted) {
                                response.status(201).json({ message: `Updated ${updated} and inserted ${inserted} reproductions until ${dateInserted.lastUpdate}` })
                            } else {
                                const newDate = new LastUpdate({ lastUpdate: endDate })
                                newDate.save().then((dateInserted) => {
                                    response.status(201).json({ message: `Updated ${updated} and inserted ${inserted} reproductions until ${dateInserted.lastUpdate}` })
                                })
                            }
                        }).catch((error) => response.status(500).json({ message: 'Error al actualizar la última fecha de actualización' }))
                    })().catch((e) => console.log(e))
                }
            }
        })
    }).catch((error) => response.status(500).json({ message: 'Error al verificar la base de datos MongoDB' }))
}

const mostReproducedSongs = (user, days) => {
    let lastSongs = []
    for (let i=user.reproductions.length-1; (i > user.reproductions.length - days && i >= 0); i--) { // 90 dias
        user.reproductions[i].songsplayed.forEach(song => {
            if (typeof lastSongs.find((el) => el.song_id === song.song_id) === 'undefined') {
                lastSongs.push({ ...song, count: 1 })
            } else {
                const index = lastSongs.findIndex((el) => el.song_id === song.song_id)
                const newCount = lastSongs[index].count + 1
                const updatedSong = { ...song, count: newCount }
                lastSongs[index] = updatedSong
            }
        })
    }
    return lastSongs.sort((a, b) => (a.count > b.count) ? -1 : ((b.count > a.count) ? 1 : 0)).slice(0, 10)
}

const nonSimilarSongs = (array1, array2) => {
    let nonSimilar = []
    nonSimilar = array2.filter((song) => array1.findIndex((song2) => song.song_id === song2.song_id) < 0)
    return nonSimilar
}

const recommendate = (user, response) => {
    const lastSongs = mostReproducedSongs(user, 90)
    console.log('inicia')
    let toRecommend = []
    ;(async () => {
        while (toRecommend.length < 10) {
            await ReproductionPerDate.aggregate([
                { $sample: { size: 1 } },
                { $match: { username: {$ne: null} } }
            ]).then((randomUser) => {
                if (randomUser.length > 0) {
                    const randomLastSongs = mostReproducedSongs(randomUser[0], 90)
                    nonSimilar = nonSimilarSongs(lastSongs, randomLastSongs)
                    if (nonSimilar.length > 0 && nonSimilar.length < 8) { // al menos 2 canciones iguales para recomendar
                        for (let song of nonSimilar) {
                            if (typeof toRecommend.find((el) => el.song_id === song.song_id) === 'undefined') {
                                toRecommend.push(song)
                                console.log(toRecommend.length)
                                break;
                            }
                        }
                    }
                }
            }).catch((error) => response.status(500).json({ message: 'Ha ocurrido un error con la base de datos durante el proceso' }))
        }
    })().then(() => {
        console.log('finaliza')
        response.status(200).json({ username: user.username ,lastSongs, toRecommend })
    }).catch((e) => response.status(500).json({ message: 'Ha ocurrido un error durante el proceso' }))
}

const recommend = (request, response) => {
    const username = request.params.id
    ReproductionPerDate.findOne({ username }).then((user) => {
        recommendate(user[0], response)
    }).catch((error) => response.status(500).json({ message: 'Error al obtener usuario' }))
}

const recommendRandom = (request, response) => {
    ReproductionPerDate.aggregate([
        { $match: { username: {$ne: null} } },
        { $sample: { size: 1 } }
    ]).then((user) => {
        recommendate(user[0], response)
    }).catch((error) => response.status(500).json({ message: 'Error al obtener usuario' }))
}

module.exports = {
    migrateRepsPerDate,
    getLastUpdate,
    recommend,
    recommendRandom,
}