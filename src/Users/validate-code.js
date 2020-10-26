const express = require('express')
const userService = require('./user-service')
const validateUserRouter = express.Router()
const bcrypt = require('bcrypt');
const jsonParser = express.json()

validateUserRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        userService.getUserByEmail(knexInstance, req.body.email
        ).then(user => {
            if (user) {
                bcrypt.compare(req.body.code, user.code, function (err, result) {
                    if (result) {
                        res.status(200).send({ success: 'validated' });
                        userService.toggleValid(knexInstance, req.body.email)
                    } else {
                        res.status(403).send({ error: 'invalid code' });
                    }
                });
            } else {
                res.status(404).send({ error: 'bad request' });
            }
        })
    })

module.exports = validateUserRouter