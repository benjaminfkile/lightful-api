const express = require('express')
const LightService = require('./light-service')
const lightRouter = express.Router()

lightRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    LightService.getAllLights(knexInstance)
      .then(Lights => {
        res.json(Lights)
      })
      .catch(next)
  })

lightRouter
  .route('/:id')
  .all((req, res, next) => {
    LightService.getLightById(req.app.get('db'), req.params.id)
      .then(Light => {
        if (!Light) {
          return res.status(404).json({
            error: { message: `Light doesn't exist` }
          })
        }
        res.Light = Light
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.Light)
  })

module.exports = lightRouter