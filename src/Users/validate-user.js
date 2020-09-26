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
      if(user){
        bcrypt.compare(pass, user.hash, function (err, result) {
          if (result) {
            return res.status(200).json({
              success: { message: `validated` }
            })
          } else {
            return res.status(403).json({
              error: { message: `validation error` }
            })
          }
        });
      }else{
        return res.status(403).json({
          error: { message: `user not found` }
        })
      }
    })
  })

module.exports = validateUserRouter