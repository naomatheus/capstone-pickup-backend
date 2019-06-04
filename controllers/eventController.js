const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const Event = require('../models/event');
const Member = require('../models/member');

// index route //

router.get('/', async (req, res, next) => {
		console.log('events index route hit');
	try {

		const allEvents = await Event.find({});
		res.json({
			status: 200,
			data: allEvents,
			credentials: 'include'
		})

	} catch(err){
		next(err)
	}
})

// index route //

// show route // 

router.get('/:id', async (req,res,next) => {
	
	console.log('event show route hit');
	try {

		const foundEvent = await Event.findById(req.params.id);

		res.json({
			status: 200,
			data: foundEvent,
			credentials: 'include'
		})

	} catch(err){
		next(err)
	}
})
// show route // 

/// post route ///

router.post('/', async (req,res,next) => {
	

	try {
		console.log('creating an event <------');
		const createdEvent = await Event.create(req.body)
		
		// const foundMember = Member.findOne({req.session.userDbId <-- don't actually have this req.session});

		res.json({
			status: 200,
			data: createdEvent,
			credentials:'include',
			otherData: 'is this the event post'
		})

	} catch (err){
		next(err)
	}
})

/// post route ///

/// put route /// 

router.put('/:id', async (req,res,next) => {
	console.log('updating an event');

	try {

		const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});

		res.json({
			status: 200,
			data: updatedEvent,
			credentials:'include'
		})

	} catch(err){
		next(err)
	}
})

/// put route /// 

/// patch route /// 

/// This route should push memberAttendees into event as the members are selecting the events they want to attend (pressing, attend event or w/e on the squad up page);

/// patch route /// 

// delete route // 

router.delete('/:id', async (req,res,next) => {

	console.log('deleting an event');

	try {

		const deletedEvent = await Event.findByIdAndRemove(req.params.id);

		res.json({
			status: 200,
			data: deletedEvent,
			credentials: 'include'
		})

	} catch (err){
		next(err)
	}
	
})

// delete route // 

module.exports = router;