const express = require('express')
const santaRouter = express.Router()
const santaService = require('./santa-service')

santaRouter
    .route('/')
    .get((req, res, next) => {
        res.send(santaService.postSanta(0))
    })



module.exports = santaRouter