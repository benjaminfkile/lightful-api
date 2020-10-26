const express = require('express')
const userService = require('./user-service')
const getUserRouter = express.Router()

getUserRouter
  .route('/:id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    const userInfo = {}
    userService.getUserByEmail(knexInstance, req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: 'user does not exist' }
          })
        } else {
          userInfo.name = user.name
          userInfo.id = user.id
          res.status(200).json(userInfo)
        }
      })
  })
module.exports = getUserRouter 
