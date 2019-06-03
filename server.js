const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const session = require('express-session');
const superagent = require('superagent');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
// node modules

const PORT = process.env.PORT;


/// require database and environment variables ///
require('dotenv').config();
require('./db/db');
/// require database and environment variables ///

// middle ware + cors // 

app.use(session({
	secret: process.env.SESSION_SECRET,
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
const memberController = require('./controllers/memberController');
const authController = require('./controllers/authController')
/// require controllers after middle ware ///

app.use('/auth', authController)
app.use('/members', memberController);

// app.use('/api/v1/apiController',apiController);
/// API /// 


/// setting up the listener
app.listen(process.env.PORT, () => {
	console.log('app is running on port', process.env.PORT);
})