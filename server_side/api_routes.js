var ctrls     = require('./controllers.js')
   ,apiRouter = require('express').Router()

apiRouter.route('/patients')
  .post(ctrls.patient.create)

module.exports = apiRouter
