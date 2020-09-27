const express = require('express')
const userService = require('./user-service')
const validateUserRouter = express.Router()
const bcrypt = require('bcrypt');
const jsonParser = express.json()


validateUserRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const code = req.body.code
        console.log(req.body)
        userService.getUserById(
            req.app.get('db'),
            req.body.email
        ).then(user => {
            if (user) {
                bcrypt.compare(req.body.code, user.hashCode, function (err, result) {
                    if (result) {
                        res.status(200).send({ success: "valid code" });
                    } else {
                        res.status(403).send({ error: "invalide code" });
                    }
                });
            } else {
                res.status(400).send({ error: "bad request" });
            }
        })
    })

module.exports = validateUserRouter