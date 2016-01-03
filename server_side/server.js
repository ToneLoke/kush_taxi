var
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	apiRoutes = require('./api_routes.js'),
	cors = require('cors')



mongoose.connect('mongodb://localhost/kushtaxi', function( err ){
	if(err) console.log( err )
	console.log( 'Connected to MongoDB' )
})

app.use( logger('dev') )
app.use( bodyParser.urlencoded({
	extended: true
}))
app.use( bodyParser.json() )
app.use( cors())

app.use( '/api', apiRoutes )

app.listen(3000, function(){
	console.log('Server Listening on port 3000...')
})
