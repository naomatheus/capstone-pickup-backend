
const express = require('express');
const router = express.Router();
const apiModel = require('../models/apiModel')
// use a model for the thirdParty API object if a user is going to be able to save a resource from the API as part of an independent or connected model 

const fetch = require('node-fetch');
/// using superagent, fetch, or node-fetch as the node module for sending HTTP requests

router.get('/', async (req, res, next) => {
	/// this calls the github jobs api and searches for remote jobs because there are not many jobs by any single location
	// referenced: https://stackoverflow.com/questions/49841983/node-fetch-problems-with-post-requests
	console.log('the jobs api route is getting hit');


	try {

		const rawJobs = await fetch('https://jobs.github.com/positions.json?utf8=%E2%9C%93&description=&location=remote', {
				method: 'GET'
		})

		const allRemoteJobs = await rawJobs.json();
		console.log(allRemoteJobs);
		await res.send({
			status: 200,
			data: allRemoteJobs
		})

	} catch (err){
		next(err)
	}

})

module.exports = router;