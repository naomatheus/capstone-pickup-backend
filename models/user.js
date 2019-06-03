const mongoose = require('mongoose');
const eventModel = require('./models/eventModel');

const userSchema = new mongoose.Schema({
	name: {type:String, required:true},
	email: {type:String, required: true},
	password: {type: String, required: true},
	bio: {
		type: String, 
		required: false, 
		min: [1, 'at least one char'],
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
	}],
	isHost: Boolean
})

const User = mongoose.model('User',userSchema)

module.exports = User;

