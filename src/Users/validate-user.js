const express = require('express')
const userService = require('./user-service')
const validateUserRouter = express.Router()
const bcrypt = require('bcrypt');
const jsonParser = express.json()


validateUserRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const pass = req.body.pass
    console.log(req.body)
    userService.getUserById(
      req.app.get('db'),
      req.body.email
    ).then(user => {
      if (user) {
        bcrypt.compare(pass, user.pass, function (err, result) {
          if (result) {
            res.status(200).send({ success: "valid password" });
          } else {
            res.status(403).send({ error: "invalid password" });
          }
        });
      } else {
        res.send('no data')
      }
    })
  })

module.exports = validateUserRouter