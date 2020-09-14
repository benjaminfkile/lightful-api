const express = require('express')
const LightService = require('./service')
const lightRouter = express.Router()
const jsonParser = express.json()


lightRouter
.route('/')
.get((req, res, next) => {
  const knexInstance = req.app.get('db')
  LightService.getAllLights(knexInstance)
    .then(Lightes => {
      res.json(Lightes)
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
  const { lat, lng, url, upvotes, id, flag, thumb, del } = req.body
  const newLight = { lat, lng, url, upvotes ,id, flag, thumb, del }

  for (const [key, value] of Object.entries(newLight))
    if (value == null)
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
      })

  LightService.insertLight(
    req.app.get('db'),
    newLight
  )
    .then(Light => {
      res.json(Light)
    })
    .catch(next)
})
/********************************************************************************/

lightRouter
.route('/:id')
.all((req, res, next) => {
  LightService.getLightById(
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
  LightService.deleteLight(
    req.app.get('db'),
    req.params.id
  )
    .then(numRowsAffected => {
      res.status(204).end()
    })
    .catch(next)
})
  
module.exports = lightRouter