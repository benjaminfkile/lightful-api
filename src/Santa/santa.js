const express = require('express')
const santaRouter = express.Router()
const axios = require('axios').default;

santaRouter
    .route('/')
    .get((req, res, next) => {
        axios.get('http://406santa.com/api/getinfo.php', {
        }).then(santa => {
            res.send(santa.data)
        }).catch(next)

    })
module.exports = santaRouter