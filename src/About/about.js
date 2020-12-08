const express = require('express')
const aboutRouter = express.Router()

aboutRouter
    .route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('406Lights server, developed by Benjamin Kile');
    })
module.exports = aboutRouter