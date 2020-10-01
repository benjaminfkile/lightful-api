const express = require('express')
const userService = require('./user-service')
const getUserRouter = express.Router()

getUserRouter
.route('/:id')
.all((req, res, next) => {
  userService.getUserByEmail(
    req.app.get('db'),
    req.params.id
  )
    .then(user => {
      if (!user) {
        return res.status(404).json({
          error: { message: `user doesn't exist` }
        })
      }
      res.user = user.name
      next()
    })
    .catch(next)
})
.get((req, res, next) => {
  res.json(res.user)
})
  
module.exports = getUserRouter