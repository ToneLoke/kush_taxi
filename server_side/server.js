// =====START GLOBAL VAR DECLARATION=====
var
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  apiRoutes = require('./api_routes.js'),
  cors = require('cors'),
  config = require('./config'),
  mongodb_url = config.mongolabs || 'mongodb://localhost/kushtaxi',
  port = process.env.PORT || 3000
// =======================================
// CONNECT TO LOCAL MONGO DB OR MONGOLABS
mongoose.connect(mongodb_url, function (err) {
  if (err) console.log(err)
  console.log('Connected to MongoDB')
})
// =======================================
// SETUP MIDDLEWARE FOR API
app.use(logger('dev'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cors())
// =======================================
// Initialize routes to use
app.use('/api', apiRoutes)
// =======================================
// SET THE PORT TO RUN
app.listen(port, function () {
  console.log('Server Listening on port ' + port + '...')
})
