const express = require('express')
const adminService = require('./admin-service')
const validateAdminRouter = express.Router()
const bcrypt = require('bcrypt');
const jsonParser = express.json()

validateAdminRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const pOne = req.body.p1
        const pTwo = req.body.p2
        adminService.getAdminById(req.app.get('db'), req.body.uName).then(user => {
            if (bcrypt.compareSync(pOne, user.p1) && bcrypt.compareSync(pTwo, user.p2)) {
                res.status(200).send("validated");
            } else {
                res.status(403).send("go away")
            }
        })
    })

module.exports = validateAdminRouter