const express = require('express')
const adminService = require('./admin-service')
const newAdminRouter = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jsonParser = express.json()

//new user
newAdminRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        let newAdmin = {}
        if (req.body.p1 && req.body.p2 && req.body.uName) {
            newAdmin.p1 = bcrypt.hashSync(req.body.p1, saltRounds);
            newAdmin.p2 = bcrypt.hashSync(req.body.p2, saltRounds);
            newAdmin.uname = req.body.uName
            res.status(200).send("admin added");
            adminService.insertAdmin(req.app.get('db'), newAdmin)
        } else {
            res.status(400).send("bad request")
        }
    })
module.exports = newAdminRouter