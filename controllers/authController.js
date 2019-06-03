const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');

// require member model // 
const Member = require('../models/member');
// require member model // 

// REGISTER ROUTE //
router.post('/register', async (req, res, next) => {
		console.log(req.body, '<-- this is req.body at start of register route');
		try {

			const foundMember = await Member.findOne({username:req.body.username})

			if (foundMember){
				console.log('username already exists!');
				req.session.loggedIn = false

				res.json({
					status: 200,
					data: 'username already exists',
					credentials: 'include'
				})
			} else {
				console.log('username is unique');
				console.log(req.body, '<-- this is the req body');
				const password = req.body.password

				// IS THERE A SECURITY RISK RIGHT HERE?

				const hashedPassword = bcrypt.hashSync(password , bcrypt.genSaltSync(10));
				// the hashed password is what we want to store in the DB
				req.body.password = hashedPassword;
				// const userDbEntry = {};
				// userDbEntry.name = req.body.name;
				// userDbEntry.username = req.body.username;
				
				// ... zipcode, email, etc
				const createdMember = await Member.create(req.body)

				res.json({
					status: 200,
					data: createdMember,
					credentials: 'include'
				})
			}
		} catch (err){
			next(err)
		}
})

// LOGIN ROUTE // 

router.post('/login', async (req, res, next) => {
		try {

			const foundMember = await Member.findOne({'username':req.body.username})

			if (!foundMember){
				console.log('member not found');
				req.session.loggedIn = false;
				res.json({
					status: 200,
					data: 'not found',
					credentials: 'include'
				})
			} else if (foundMember) {
				const hashedPassword = foundMember.password;
				const passwordMatch = bcrypt.compareSync(req.body.password, hashedPassword);
				console.log(passwordMatch, '<-- this is passwordMatch comparison');
				if (passwordMatch){
					req.session.usersDbId = foundMember._id

					req.session.username = req.body.username

					req.session.loggedIn = true;

					res.json({
						status: 200,
						data: req.session,
						credentials: 'include',
						otherData: 'user has been logged in'
					})
				} else if (!passwordMatch){
					res.json({
						status: 202,
						data: req.session,
						credentials: 'include',
						otherData: 'password did not match try again'
					})
				}
			}

		} catch (err){
			next(err)
		}
})

// LOGIN ROUTE // 

/// LOGOUT ROUTE // 

router.get('/logout', async (req, res, next) => {

		req.session.destroy((err) => {
			
			if (err){
				res.json({
					status: 400,
					data: err,
					credentials: 'include',
					message: 'there was an issue, user not logged out'
				})
			} else {
				res.json({
					status: 200,
					data: 'logout successful',
					credentials: 'include'
				})
			}
		})
	
})

/// LOGOUT ROUTE //

module.exports = router;  