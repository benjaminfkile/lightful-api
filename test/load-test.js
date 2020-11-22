const express = require('express')
const LoadRouter = express.Router()
const LoadService = require('../test/load-service');

LoadRouter
    .route('/')
    .get((req, res, next) => {
        return res.status(200).send(LoadService.getToken())
    })

module.exports = LoadRouter