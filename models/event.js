const mongoose = require('mongoose');
const memberModel = require('../models/member');

const eventSchema = new mongoose.Schema({
	name: {type:String, required:true},
	sport: {type:String, required: true},
	ISO : {type: String, required: true},
	description: {
		type: String, 
		required: false, 
		min: [10, 'at least ten chars'],
		max: [120, 'no more than 120 chars']
	},
	sportPic: {
		type: Buffer, 
		required: false 
		//, default: defaultpic
	},
	memberAttendees: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member' 
	}],
	location: String,
	date: Date,
	createdBy: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}],
	maxPlayers: {type: Number, required:true}
	// how would I populate a number of players based on the sport that was selected?
	// should I create arrays for my sport types with keys and values for each property of the sport
})

const Event = mongoose.model('Event',eventSchema)

module.exports = Event;