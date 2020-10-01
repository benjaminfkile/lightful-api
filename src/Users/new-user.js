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
    let newUser = {}
    let valCode = ''
    valCode += Math.floor(Math.random() * 90000) + 10000;
    userService.getUserByEmail(req.app.get('db'), req.body.email
    ).then(user => {
      if (req.body.name && req.body.email && req.body.pass) {
        if (!user) {
          newUser.name = req.body.name
          newUser.email = req.body.email
          newUser.pass = bcrypt.hashSync(req.body.pass, saltRounds);
          newUser.code = bcrypt.hashSync(valCode, saltRounds);
          newUser.valid = 0
          newUser.perms = 0
          res.status(200).send("user added");
          userService.insertUser(req.app.get('db'), newUser)
          userService.sendValidationMail(newUser.name, newUser.email, valCode)
        } else {
          res.status(202).send("email taken");
        }
      } else {
        res.status(400).send("bad request")
      }
    })
  })
module.exports = newUserRouter