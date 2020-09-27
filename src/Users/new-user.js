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
        let clientCode = (Math.floor(Math.random() * 90000) + 10000);
        let hashCode = ''

        bcrypt.hash(clientCode.toString(), saltRounds, function (err, hash) {
          hashCode += hash
        })

        bcrypt.hash(pass, saltRounds, function (err, pass) {
          let newUser = { name, email, pass, hashCode }

          for (const [key, value] of Object.entries(newUser))
            if (value == null)
              res.send('Missing |' + key + '| in request body')
          userService.insertUser(
            req.app.get('db'),
            newUser
          )
            .then(newUser => {
              userService.sendValidationMail(
                newUser.name,
                newUser.email,
                clientCode)
            })

          if (newUser) {
            res.status(200).send({ success: "added user" });
          } else {
            res.status(404).send({error: "bad request body" });
          }
        });
      } else {
        res.status(403).send({ error: "email taken" });

      }
    })
  })

module.exports = newUserRouter