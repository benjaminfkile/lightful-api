require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const lights = require('./Lights/lights')
const stats = require('./Stats/stats')
const newUser = require('./Users/new-user')
const getUser = require('./Users/get-user')
const validateUser = require('./Users/validate-user')
const validateCode = require('./Users/validate-code')
const places = require('./Places/places')
const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(cors())
app.use(helmet())

app.use('/api/lights', lights)
app.use('/api/lights/contributor', lights)
app.use('/api/stats', stats)
app.use('/api/users/new', newUser)
app.use('/api/users/validate', validateUser)
app.use('/api/users/valCode', validateCode)
app.use('/api/users', getUser)
app.use('/api/places' ,places)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app