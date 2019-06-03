const mongoose = require('mongoose');
const memberModel = require('./models/eventModel');

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
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member' 
	}],
	location: String,
	date: Date,
	host: {
		mongoose.Schema.Types.ObjectId,
		ref: 'Member'
	}
})

const Event = mongoose.model('Event',userSchema)

module.exports = Event;