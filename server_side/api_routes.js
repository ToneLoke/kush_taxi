var ctrls = require('./controllers.js'),
  apiRouter = require('express').Router(),
  multipart = require('connect-multiparty')(),
  jwt = require('jsonwebtoken'),
  secret = 'meow'

apiRouter.route('/patients')
  .post(multipart, ctrls.patient.create)
  .get(ctrls.patient.all)
apiRouter.route('/authenticate')
  .post(ctrls.patient.signIn)
apiRouter.use(function (req, res, next) {
  // LOOK FOR TOKEN IN 3 LOCATIONS BODY OBJECT PARAMETER KEY OR HEADER OBJECT
  var token = req.body.token || req.param('token') || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, secret, function (err, decodedToken) {
      if (err) res.json({message: 'cant authenticate', success: false})
      req.decoded = decodedToken
      next()
    })
  } else {
    res.json({message: 'no token found', success: false})
  }
})
// Single Show for patient
apiRouter.route('/patient/:_id')
  .get(ctrls.patient.data)
// api endpoint to get user information
apiRouter.get('/me', function (req, res) {
  res.send(req.decoded)
})

module.exports = apiRouter
