var
ctrls = require('./controllers.js'),
apiRouter = require('express').Router(),
multipart = require('connect-multiparty')(),
jwt = require('jsonwebtoken'),
secret = "meow"


apiRouter.route('/patients')
.post(multipart, ctrls.patient.create)
apiRouter.use(function(req, res, next) {
  // LOOK FOR TOKEN IN 3 LOCATIONS BODY OBJECT PARAMETER KEY OR HEADER OBJECT
  var token = req.body.token || req.param('token') || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, secret, function(err, decodedToken) {
      if (err) res.json({
        message: 'cant authenticate'
      })
      req.decoded = decodedToken
      next()
    })
  } else {
    res.json({
      message: 'no token found'
    })
  }

})

})

module.exports = apiRouter
