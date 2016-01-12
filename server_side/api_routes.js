var ctrls = require('./controllers.js'),
  apiRouter = require('express').Router(),
  multipart = require('connect-multiparty')()

apiRouter.route('/patients')
  .post(multipart, ctrls.patient.create)

module.exports = apiRouter
