const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Member = require('../models/member');
const Event = require('../models/event');

/// INDEX/GET ROUTE, gets. a resource /// 
router.get('/', async (req, res, next) => {
	console.log('index route hit');

	try {

		const allMembers = await Member.find({});

		res.json({
			status: 200,
			data: allMembers,
			credentials: 'include'
		})

	} catch (err){
		next(err)
	}
})

/// INDEX/GET ROUTE, gets. a resource /// 

// Get information about one member /// 
/// SHOW ROUTE /// 

router.get('/:id', async (req,res,next) => {
	
	try {
		const oneMember = await Member.findById(req.params.id)
		/// OR /// 
		// const oneSample = await Member.findOne({
		// 	username: req.body.username
		// });
		res.json({
			status: 200,
			data: oneMember,
			credentials: 'include'
		})

	} catch (err) {
		next(err)
	}

});

/// SHOW ROUTE /// 

// /// POST ROUTE /// 

// router.post('/register', async (req, res, next) => {
// 	try {

// 		const createdMember = await Member.create(req.body)

// 		res.json({
// 			status: 200,
// 			data: createdMember,
// 			credentials: 'include'
// 		})

// 	} catch (err){

// 		next(err)
// 	}
// })
// /// POST ROUTE /// 

// UPDATE ROUTE // 
// has a put or patch method // 

router.put('/:id', async (req,res,next) => {
	try {
		const foundMember = await Member.findByIdAndUpdate(req.params.id, req.body, {new: true});

		res.json({
			status: 200,
			data: foundMember,
			credentials: 'include'
		})

	} catch(err){
		next(err);
	}
})

// UPDATE ROUTE // 

/// DELETE ROUTE // 

router.delete('/:id', async (req, res, next) => {
	
	try {

		const deletedMember = await Member.findByIdAndRemove(req.params.id)

		res.json({
			status: 200,
			data: deletedMember,
			credentials: 'include'
		})

	} catch (err){
		next(err)
	}
})

/// DELETE ROUTE //

// event post route //
router.post('/:id/events', async (req,res,next) => {
	console.log('creating an event');

	try {

		const createdEvent = await Event.create(req.body)

		res.json({
			status: 200,
			data: createdEvent,
			credentials:'include'
		})

	} catch (err){
		next(err)
	}
})
// event post route //

module.exports = router;
