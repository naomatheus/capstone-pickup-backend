/// new model //
// TEMPLATE FOR A MONGOOSE MODEL ///

const mongoose = require('mongoose');
const anyConnectedModel = require('./models/anyConnectedModel');

const modelSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: String,
	/// mongoose schema data types and guide can be found here 
	// https://mongoosejs.com/docs/models.html
	password: {type: String, require: true},
	/// ^^ Use this format of compiling a model with mongoose schema wrapper when the property has two or more object property variables,
	sampleProp: Number,
	sampleProp2: Boolean
})

// export the model

module.exports = mongoose.model('BookOrNameOfThing', modelSchema);

// instantiate the model at the END of this document

// An instance of a model is called a document. Creating them and saving to the database is easy.

