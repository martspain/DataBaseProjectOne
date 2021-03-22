const { request, response } = require('express')
const connection = require('./connection')
const jwt = require('jsonwebtoken');
const secretPassword = 'itsasecret';

const verifyToken = (request, response, next) => {
    const bearer = request.headers['authorization'] // authorization debe estar en minusculas
    if (typeof bearer !== 'undefined') {
        const token = bearer.split(' ')?.[1]
        jwt.verify(token, secretPassword, (error, authData) => {
            if (error) response.status(403).json({ message: 'token no valido' })
            request.user = authData.user
            next()
        })
    } else {
        response.status(403).json({ message: 'no se encontró el encabezado de autorización' })
    }
}

const verifyArtist = (request, response, next) => {
    if (typeof request.user.artist !== 'undefined') {
        next()
    } else {
        response.status(403).json({ message: 'Acceso de artista no autorizado' })
    }
}

const verifySubscription = (request, response, next) => {
    if (typeof request.user.subscription !== 'undefined') {
        next()
    } else {
        response.status(403).json({ message: 'Acceso de subscriptor no autorizado' })
    }
}

const verifyManager = (request, response, next) => {
    if (typeof request.user.manager !== 'undefined') {
        next()
    } else {
        response.status(403).json({ message: 'Acceso de manager no autorizado' })
    }
}

module.exports = {
    verifyToken,
    verifyArtist,
    verifySubscription,
    verifyManager,
    secretPassword,
}