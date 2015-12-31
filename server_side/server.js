var
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	path = require('path'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	apiRoutes = require('./api_routes.js')


mongoose.connect('mongodb://localhost/kushtaxi', function(err){
	if(err) console.log(err)
	console.log('Connected to MongoDB')
})

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))

app.use('/api', apiRoutes)

app.listen(3000, function(){
	console.log('Server Listening on port 3000...')
})
