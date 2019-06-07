const mongoose = require('mongoose');
const eventModel = require('../models/event');

const memberSchema = new mongoose.Schema({
	username: {type: String/*, required:true, path: 'username'*/},
	firstName: {type: String/*, required:true*/},
	lastName: {type: String/*, required:true*/},
	email: {type: String/*, required: true*/},
	password: {type: String/*, required: true, path: 'password'*/},
	bio: {
		type: String, 
		required: false, 
		min: [1, 'at least one char'],
		max: [120, 'no more than 120 chars']
	},
	profilePic: {
		type: Buffer, 
		required: false 
		// ,default: defaultpic
	},
	/// when an event is created, it gets pushed  into the foundMember's eventsCreated array. eventsCreated array on the member receives the eventId
	isHost: Boolean,
	age: {
		type: Number,
		/*required: true,*/
		min: [18, 'beta for 18 and older'],
		max: [100, 'dude come on you are not that old']
	},
	gender: {
		type: String,
		enum:['Male','Female','Non-Binary','Prefer Not To Say']
		// ,required: true
	},
	eventsAttending: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		required: false
	}]
})

const Member = mongoose.model('Member',memberSchema)

module.exports = Member;

