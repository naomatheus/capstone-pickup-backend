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

// Member PUT ROUTE // 

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

//// EVENT ROUTES /////

// event post route //
router.post('/:id/events', async (req,res,next) => {
	console.log('creating an event');

	try {

		const createdEvent = await Event.create(req.body)

		/// find the id of the logged in user, and send that user's ID into the createdBy propety of the event
		
		const foundMember = await Member.findOne({_id:req.params.id});

		await createdEvent.createdBy.push(foundMember._id);

		/// when an event is created, it gets pushed  into the foundMember's eventsCreated array. eventsCreated array on the member receives the eventId
		await foundMember.eventsCreated.push(createdEvent._id);

		console.log(foundMember, 'after the event is pushed in ');


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

//// EVENT PATCH ROUTE ////

/// in this route, an event will be found based on its ID.
/// the member will be found based on the id

/// the event document will be modified to reflect the member that plans on attending

router.patch('/:id/events/:eventId/join', async (req, res, next) => {

	// - PUT/PATCH 'user/{id}/game/{gameId}/edit||join'
	// -- Allows user to edit a game resource

	const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId);
	const foundMember = await Member.findById(req.params.id);

	/// the member found will be able to say they are attending this event

	console.log(updatedEvent, '<-- this is the updated event');
	updatedEvent.memberAttendees.push(foundMember._id);

	const attendingMember = await Member.findByIdAndUpdate(req.params.id);

	

	attendingMember.eventsAttending.push(updatedEvent._id);

	console.log(attendingMember, '<-- this is the member document that should receive an eventId in its eventsAttending property');

	res.json({
		status: 200,
		data: updatedEvent,
		otherData: attendingMember,
		credentials: 'include'
	})
})

//// EVENT PATCH ROUTE ////

/// MEMBER PATCH ROUTE //// 

// in this route, members are able to add themselves to events. the eventsAttending property of the member document is updated to include the ID of events the member would like to attend

// this route will find a member
		// this route will find an event by id

// 		const foundEvent = Event.findOne()
// 		// this route should update a member document's eventsAttending property with ids of events they select
// router.patch('/:id/events/:eventId/join')





module.exports = router;
