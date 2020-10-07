const express = require('express')
const queuService = require('./queu-service')
const queuRouter = express.Router()
const jsonParser = express.json()


queuRouter
  .route('/')
  .get(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db')
    queuService.getAllLights(knexInstance)
      .then(Lights => {
        res.json(Lights)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { lat, lng, url, id, userId, del } = req.body
    const newLight = { lat, lng, url, id, userId, del }

    for (const [key, value] of Object.entries(newLight))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    queuService.insertLight(
      req.app.get('db'),
      newLight
    )
      .then(Light => {
        res.json(Light)
      })
      .catch(next)
  })
/********************************************************************************/

queuRouter
  .route('/:id')
  .all((req, res, next) => {
    queuService.getLightById(
      req.app.get('db'),
      req.params.id
    )
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
  .delete((req, res, next) => {
    queuService.deleteLight(
      req.app.get('db'),
      req.params.id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = queuRouter