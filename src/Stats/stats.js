const express = require('express')
const upvoteService = require('./stat-service')
const lightService = require('../Lights/light-service')
const userService = require('../Users/user-service')
const statRouter = express.Router()
const jsonParser = express.json()

statRouter
  .route('/upvote/')
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db')
    userService.getUserById(knexInstance, req.body.userId)
      .then(user => {
        if (user && user.valid === '1') {
          lightService.getLightById(knexInstance, req.body.id)
            .then(light => {
              if (light) {
                let likes = 0
                for (let i = 0; i < light.upvotes.length; i++) {
                  if (light.upvotes[i] === req.body.userId) {
                    likes++
                  }
                }
                if (likes < 1) {
                  upvoteService.castVote(knexInstance, req.body.id, req.body.userId)
                  return res.status(200).json({
                    success: { message: 'vote cast' }
                  })
                } else {
                  return res.status(200).json({
                    error: { message: 'already liked' }
                  })
                }
              } else {
                return res.status(404).json({
                  error: { message: 'not found' }
                })
              }
            })
        } else {
          return res.status(403).json({
            error: { message: 'user not validated' }
          })
        }
      })
  })

  statRouter
  .route('/trip/')
  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get('db')
    upvoteService.castTrip(knexInstance, req.body.id, req.body.ip)
  })
  
module.exports = statRouter