const express = require('express')
const bcrypt = require('bcrypt');
const adminService = require('./admin-service')
const adminRouter = express.Router()
const jsonParser = express.json()

adminRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    adminService.getAllLights(knexInstance)
      .then(Lights => { res.json(Lights) })
  })
  .post(jsonParser, (req, res, next) => {
    const { lat, lng, url, id, upvotes, uName, p1, p2 } = req.body
    const newLight = { lat, lng, url, id, upvotes }
    const admin = { uName, p1, p2 }
    adminService.getAdminById(req.app.get('db'), admin.uName).then(user => {
      if (bcrypt.compareSync(admin.p1, user.p1) && bcrypt.compareSync(admin.p2, user.p2)) {
        adminService.insertLight(req.app.get('db'), newLight)
          .then(Light => { res.json(Light) })
      } else {
        res.status(403).send("go away")
      }
    })
  })

adminRouter
  .route('/db/purge/:id')
  .delete(jsonParser, (req, res, next) => {
    adminService.getAdminById(req.app.get('db'), req.body.uName).then(user => {
      if (bcrypt.compareSync(req.body.p1, user.p1) && bcrypt.compareSync(req.body.p2, user.p2)) {
        adminService.deleteLight(req.app.get('db'), req.params.id)
          .then(res.status(200).send("purged light from database"))
      } else {
        res.status(403).send("go away")
      }
    })
  })

adminRouter
  .route('/queu/purge/:id')
  .delete(jsonParser, (req, res, next) => {
    adminService.getAdminById(req.app.get('db'), req.body.uName).then(user => {
      if (bcrypt.compareSync(req.body.p1, user.p1) && bcrypt.compareSync(req.body.p2, user.p2)) {
        adminService.deleteQueu(req.app.get('db'), req.params.id)
          .then(res.status(200).send("purged light from queu"))
      } else {
        res.status(403).send("go away")
      }
    })
  })

module.exports = adminRouter