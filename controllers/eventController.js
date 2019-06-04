const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('../models/event');

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