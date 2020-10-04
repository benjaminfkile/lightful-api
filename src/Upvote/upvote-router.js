const express = require('express')
const upvoteService = require('./upvote-service')
const lightService = require('../Lights/light-service')
const userService = require('../Users/user-service')
const likeRouter = express.Router()
const jsonParser = express.json()

likeRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    userService.getUserById(req.app.get('db'), req.body.userId)
      .then(user => {
        if (user && user.valid === '1') {
          lightService.getLightById(req.app.get('db'), req.body.id)
            .then(light => {
              if (light) {
                let likes = 0
                for (let i = 0; i < light.upvotes.length; i++) {
                  if (light.upvotes[i] === req.body.userId) {
                    likes++
                  }
                }
                if (likes < 1) {
                  upvoteService.castVote(req.app.get('db'), req.body.id, req.body.userId)
                  return res.status(200).json({
                    success: { message: `vote cast` }
                  })
                } else {
                  return res.status(403).json({
                    error: { message: `already liked` }
                  })
                }
              } else {
                return res.status(400).json({
                  error: { message: `bad request` }
                })
              }
            })
        } else {
          return res.status(403).json({
            error: { message: `user not validated` }
          })
        }
      })
  })
module.exports = likeRouter