/// sample controller setup //

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/// REQUIRE THE CONTROLLER(S) ///
const Sample = require('../models/sample');
/// REQUIRE THE CONTROLLER(S) ///

/// HTTP VERBS ///
/// THEY CORRESOND TO ROUTES AND RESTFUL ACTIONS ///

/// SOME ROUTES HAVE TWO COMPONENT ACTIONS /// For example, Edit and Update may have a Get route to render the edit form, and another to PUT or PATCH the update

/// INDEX/GET ROUTE, gets. a resource /// 
router.get('/', (req, res, next) => {
	console.log('this route would typically show all of a resource, show all samples');
	try {

		const allSamples = await Sample.find({});

		res.json({
			status: 200,
			data: allSamples,
			credentials: 'include'
		})

	} catch (err){
		next(err)
	}
})

/// INDEX/GET ROUTE, gets. a resource /// 

// Get information about one sample /// 
/// SHOW ROUTE /// 

router.get('/:id', (req,res,next) => {
	
	try {

		const oneSample = await Sample.findById(req.params.id)
		/// OR /// 
		const oneSample = await Sample.findOne({
			username: req.body.username
		});

		res.json({
			status: 200,
			data: oneSample,
			credentials: 'include'
		})

	} catch (err) {
		next(err)
	}

});

/// SHOW ROUTE /// 

// SAMPLE REGISTER ROUTE // 
// to create a new resource in the DB using user input
/// POST ROUTE /// 

router.post('/sample/:id', (req, res, next) => {
	try {

		const createdSample = await Sample.create(req.body)

		res.json({
			status: 200,
			data: createdSample,
			credentials: 'include'
		})

	} catch (err){

		next(err)
	}
})
/// POST ROUTE /// 

// UPDATE ROUTE // 
// has a put or patch method // 

router.put('/:id', (req,res,next) => {
	try {

		const foundSample = await Sample.findByIdAndUpdate(req.params.id, req.body, {new: true});

		res.json({
			status: 200,
			data: foundSample,
			credentials: 'include'
		})

	} catch(err){
		next(err);
	}
})

// UPDATE ROUTE // 

/// DELETE ROUTE // 

router.delete('/:id', async (req, res, next) => {
	// has a delete action 
	try {

		const deletedSample = await Sample.findByIdAndRemove(req.params.id)

		res.json({
			status: 200,
			data: deletedSample,
			credentials: 'include'
		})

	} catch (err){
		next(err)
	}
})

/// DELETE ROUTE //

/// DO NOT FORGET TO EXPORT ROUTER;

module.exports = router;
