const express = require('express')
const userService = require('./user-service')
const validateUserRouter = express.Router()
const bcrypt = require('bcrypt');
const jsonParser = express.json()


validateUserRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const pass = req.body.pass
    userService.getUserByEmail(req.app.get('db'), req.body.email).then(user => {
      // console.log(user)
      if (user && user.email && (user.valid === "1")) {
        bcrypt.compare(pass, user.pass, function (err, result) {
          if (result) {
            res.status(200).send("valid password");
          } else {
            res.status(403).send("invalid password");
          }
        });
      } else {
        res.status(202).send('user doesnt exist')
      }
    })
  })

module.exports = validateUserRouter