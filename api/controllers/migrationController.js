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

module.exports = {
    migrateRepsPerDate,
    getLastUpdate,
}