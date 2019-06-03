const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const session = require('express-session');
const superagent = require('superagent');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');

// node modules

const port = '#';
// HAS SERVE STATIC

/// require database and environment variables ///
require('.dotenv').config();
require('./db/db');
/// require database and environment variables ///

// middle ware + cors // 

// const port = process.env.port;
app.use(session({
	secret: 'asdjkasdjabdad',
	// secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({
	extended: false
}))
// enable parsing of JSON
app.use(bodyParser.json());
// enable parsing of JSON
// middle ware + cors // 

const corsOptions = {
	origin: process.env.REACT_CLIENT_URL,
	credentials: true,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// middle ware + cors // 

/// require controllers after middle ware ///

const nameOfController = require('./controllers/nameOfController');
// SAMPLE NAMES:
importantPageController;
importantReqResCycleController;
apiController;
thirdPartyApiController;

/// require controllers after middle ware ///


/// Routes and API ///  LIST THESE FROM LEAST TO MOST SPECIFIC

app.use('/theUrl/thatShouldHitThisController', importantPageController);

app.use('/api/v1/apiController',apiController);

/// API /// 


/// setting up the listener
app.listen(port, () => {
	console.log('app is running on port', port);
})

// EXPRESS docs





// EXPRESS docs
