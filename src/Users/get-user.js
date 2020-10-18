const express = require('express')
const userService = require('./user-service')
const getUserRouter = express.Router()
const fuck = {}

getUserRouter
  .route('/:id')
  .get((req, res, next) => {
    const userInfo = {}
    userService.getUserByEmail(req.app.get('db'), req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: `user doesn't exist` }
          })
        } else {
          userInfo.name = user.name
          userInfo.id = user.id
          res.status(200).json(userInfo)
        }
      })
  })
module.exports = getUserRouter 
