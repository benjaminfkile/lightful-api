const express = require('express')
const userService = require('./user-service')
const lightService = require('../Lights/light-service')
const validateUserRouter = express.Router()
const bcrypt = require('bcrypt');
const jsonParser = express.json()


validateUserRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const pass = req.body.pass
    const knexInstance = req.app.get('db')
    userService.getUserByEmail(knexInstance, req.body.email).then(user => {
      if (user && user.email && (user.valid === '1')) {
        bcrypt.compare(pass, user.pass, function (err, result) {
          if (result) {
            res.status(200).send('valid password');
          } else {
            res.status(403).send('invalid password');
          }
        });
      } else {
        res.status(202).send('user doesnt exist')
      }
    })
  })

validateUserRouter
  .route('/toggle/:id')
  .post(jsonParser, (req, res, next) => {
    const pass = req.body.pass
    const knexInstance = req.app.get('db')
    userService.getUserById(knexInstance, req.body.user).then(user => {
      if (user && user.email && (user.valid === '1')) {
        bcrypt.compare(pass, user.pass, function (err, result) {
          if (result) {
            res.status(200).send('valid password');
            if (req.body.on === 'f') {
              lightService.toggleOn(knexInstance, req.body.id, 't')
            }
            else {
              lightService.toggleOn(knexInstance, req.body.id, 'f')
            }
          } else {
            res.status(403).send('invalid password');
          }
        });
      } else {
        res.status(202).send('user doesnt exist')
      }
    })
  })

  validateUserRouter
  .route('/del/:id')
  .post(jsonParser, (req, res, next) => {
    const pass = req.body.pass
    const knexInstance = req.app.get('db')
    userService.getUserById(knexInstance, req.body.user).then(user => {
      if (user && user.email && (user.valid === "1")) {
        bcrypt.compare(pass, user.pass, function (err, result) {
          if (result) {
            res.status(200).send('deleted light');
            lightService.deleteLight(knexInstance, req.body.id)
          } else {
            res.status(403).send('invalid password');
          }
        });
      } else {
        res.status(202).send('user doesnt exist')
      }
    })
  })

module.exports = validateUserRouter