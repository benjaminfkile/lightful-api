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
const resetPass = require('./Users/reset-pass')
const places = require('./Places/places')
// const santa = require('./Santa/santa')
const about = require('./About/about')
const loadTest = require('../test/load-test')
const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(cors())
app.use(helmet())

app.use('/' , about)
app.use('/api/lights', lights)
app.use('/api/lights/contributor', lights)
app.use('/api/stats', stats)
app.use('/api/users/new', newUser)
app.use('/api/users/validate', validateUser)
app.use('/api/users/valCode', validateCode)
app.use('/api/users/resetPass', resetPass)
app.use('/api/users', getUser)
app.use('/api/places', places)
// app.use('/api/santa', santa)
app.use('/loaderio-4f8dc8d17230800decfb7f2218721bc6/', loadTest)

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