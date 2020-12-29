const express = require('express')
const santaRouter = express.Router()
const santaService = require('./santa-service')
const jsonParser = express.json()


santaRouter
    .route('/')

    .get((req, res, next) => {
        res.send(santaService.postSanta(0))
    })

    .post(jsonParser, async (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { lat, lng, url, id, active } = req.body
        let newPic = { lat, lng, url, id, active }
        santaService.postPic(knexInstance, newPic).then(newPic => {
            return res.status(200).json({
                success: { message: 'image posted' }
            })
        }).catch(function (error) {
            return res.status(400).json({
                error: { message: 'bad request' }
            })
        });

    })

santaRouter
    .route('/81335057-1944-4e9c-9c06-83d1d7ba5167')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        santaService.getPics(knexInstance)
        .then(pics => {
          res.json(pics)
        })
        .catch(next)
    })


module.exports = santaRouter