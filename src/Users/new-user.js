const express = require('express')
const userService = require('./user-service')
const newUserRouter = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jsonParser = express.json()

//new user
newUserRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    userService.getUserById(
      req.app.get('db'),
      req.body.email
    ).then(user => {
      if (!user) {
        const { name, email, pass } = req.body
        const code = Math.floor(Math.random() * 90000) + 10000;
        bcrypt.hash(pass, saltRounds, function (err, hash) {
          const newUser = { name, email, hash, code }
          for (const [key, value] of Object.entries(newUser))
            if (value == null)
              return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
              })
          userService.insertUser(
            req.app.get('db'),
            newUser
          )//hide this somehow
            .then(newUser => {
              userService.sendValidationMail(newUser.name, newUser.email, newUser.code)
            }).then(
            )
          if (newUser) {
            return res.status(200).json({
              success: { message: `user added` }
            })
          } else {
            return res.status(400).json({
              error: { message: `failed to add user` }
            })
          }
        });
      } else {
        return res.status(403).json({
          error: { message: `EMAIL ALREADY REGISTERED!` }
        })
      }
    })
  })

module.exports = newUserRouter