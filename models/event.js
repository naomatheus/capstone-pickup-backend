const mongoose = require('mongoose');
const userModel = require('./models/eventModel');

const userSchema = new mongoose.Schema({
	name: {type:String, required:true},
	sport: {type:String, required: true},
	: {type: String, required: true},
	bio: {
		type: String, 
		required: false, 
		min: [10, 'at least ten chars'],
		max: [120, 'no more than 120 chars']
	},
	profilePic: {
		type: Buffer, 
		required: true, 
		default: defaultpic
	},
	userGames: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event' 
	}]
})

const User = mongoose.model('User',userSchema)

module.exports = User;