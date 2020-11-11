const express = require('express')
const userService = require('./user-service')
const resetRouter = express.Router()
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jsonParser = express.json()

resetRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {

        if (req.body.email && req.body.email !== "") {
            const knexInstance = req.app.get('db')
            const email = req.body.email
            userService.getUserByEmail(knexInstance, email)
                .then(user => {
                    const resetCode = crypto.randomBytes(16).toString('hex');
                    const hash = bcrypt.hashSync(resetCode, saltRounds);
                    userService.sendResetMail(user.name, user.email, resetCode)
                    userService.changeCode(knexInstance, user.id, hash)
                })
            res.status(200).send('code sent')
        } else {
            res.status(404).send('bad request')
        }
    })

resetRouter
    .route('/update')
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        userService.getUserByEmail(knexInstance, req.body.email
        ).then(user => {
            if (user) {
                bcrypt.compare(req.body.code, user.code, function (err, result) {
                    if (result) {
                        res.status(200).send({ success: 'updated' });
                        userService.toggleValid(knexInstance, req.body.email)
                        const pass = bcrypt.hashSync(req.body.pass, saltRounds);
                        userService.changePass(knexInstance, req.body.email, pass)
                    } else {
                        res.status(403).send({ error: 'invalid params' });
                    }
                });
            } else {
                res.status(404).send({ error: 'bad request' });
            }
        })
    })

module.exports = resetRouter