require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const queuRouter = require('./Queu/queu-router')
const lightRouter = require('./Lights/light-router')
const upvoteRouter = require('./Upvote/upvote-router')
const newUser = require('./Users/new-user')
const getUser = require('./Users/get-user')
const validateUser = require('./Users/validate-user')
const validateCode = require('./Users/validate-code')
const newAdmin = require('./Admins/new-admin')
const validateAdmin = require('./Admins/validate-admin')
const adminRouter = require('./Admins/admin-router')
const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(cors())
app.use(helmet())

app.use('/api/queu', queuRouter)
app.use('/api/lights', lightRouter)
app.use('/api/upvote', upvoteRouter)
app.use('/api/users/new', newUser)
app.use('/api/users/validate', validateUser)
app.use('/api/users/valCode', validateCode)
app.use('/api/users', getUser)
app.use('/06efbe47-e73a-48fb-861a-76105b45a017/admin/new', newAdmin)
app.use('/a0af7152-7472-48e3-ae4b-10918682f2b3/admin/validate', validateAdmin)
app.use('/5967e868-eb31-4feb-abb6-3218b984e9f2/admin/post', adminRouter)


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app