const express = require('express')
const axios = require('axios').default;
const crypto = require("crypto");
const LightService = require('./light-service')
const lightRouter = express.Router()
const sightengine = require('sightengine')('656105033', 'ELQmQagYWZyvoBkovEJ3');
const jsonParser = express.json()

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
  .post(jsonParser, (req, res, next) => {
    const { lat, lng, url, id, user, del, upvotes } = req.body
    let newLight = { lat, lng, url, id, user, del, upvotes }

    sightengine.check(['nudity', 'wad', 'properties', 'offensive', 'faces', 'text-content', 'face-attributes', 'text']).set_url(newLight.url).then(function (result) {
      let decision = LightService.auditLight(result)
      if (!decision.denied) {
        axios.post("https://api.imgbb.com/1/upload?key=eeadc880da3384d7927fb106962183a2&name=" + crypto.randomBytes(16).toString("hex") + "&image=" + newLight.url, {})
          .then(res => {
            // console.log(res)
            newLight.url = res.data.data.display_url
            newLight.del = res.data.data.delete_url
            LightService.insertLight(req.app.get('db'), newLight)
          }).catch(function (error) {
            console.log(error)
            return res.status(400).json({
              error: { message: `Server error` }
            })
          });
      }
      console.log(decision)
    }).catch(function (err) {
      console.log(err)
      return res.status(400).json({
        error: { message: `Server error` }
      })
    });
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