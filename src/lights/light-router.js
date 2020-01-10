const express = require('express')
const LightService = require('./light-service')
const lightRouter = express.Router()

lightRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    LightService.getAllLights(knexInstance)
      .then(lights => {
        res.json(lights)
      })
      .catch(next)
  })
  
module.exports = lightRouter