// =====START GLOBAL VAR DECLARATION=====
var
  ctrls = require('./controllers.js'),
  apiRouter = require('express').Router(),
  multipart = require('connect-multiparty')(),
  jwt = require('jsonwebtoken'),
  secret = 'meow'
// =====END GLOBAL VAR DECLARATION
// =======================================
// CREATE PATIENT
apiRouter.route('/patients')
  .post(multipart, ctrls.patient.create)
// Log in and get a token
apiRouter.route('/authenticate')
  .post(ctrls.patient.signIn)
// Everyone view all products
apiRouter.route('/products')
  .get(ctrls.product.all)
// MIDDLEWARE AUTHENTICATION USING JOTS
apiRouter.use(function (req, res, next) {
// LOOK FOR TOKEN IN 3 LOCATIONS BODY OBJECT PARAMETER KEY OR HEADER OBJECT
  var token = req.body.token || req.param('token') || req.headers['x-access-token']
// IF A TOKEN EXISTS SEND THE DECODED INFORMATION
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
// Create and update products for admin use only
apiRouter.route('/products')
  .post(ctrls.product.create)
  // .put(ctrls.product.update)
// Show all patients for admin use only
apiRouter.route('/patients')
  .get(ctrls.patient.all)
// Single Show and Update for patient
apiRouter.route('/patient/:_id')
  .get(ctrls.patient.data)
  // .put(ctrls.patient.update)
// api endpoint to get user information
apiRouter.get('/me', function (req, res) {
  res.send(req.decoded)
})

module.exports = apiRouter
