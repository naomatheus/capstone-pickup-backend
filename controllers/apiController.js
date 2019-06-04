
const express = require('express');
const router = express.Router();
// const apiModel = require('../models/apiModel')
// use a model for the thirdParty API object if a user is going to be able to save a resource from the API as part of an independent or connected model 

const fetch = require('node-fetch');
/// using superagent, fetch, or node-fetch as the node module for sending HTTP requests

router.get('/', async (req, res, next) => {
	
	console.log('the chicago park district api route is being hit');
	try {

		const allParkData = await fetch('https://data.cityofchicago.org/api/views/eix4-gf83/rows.json?accessType=DOWNLOAD', {
				method: 'GET'
		})

		const parkDataJSON = await allParkData.json();
		// This algorithm filters park data down to the names of largest parks //
		const largeParks = parkDataJSON.meta.view.columns[10].cachedContents.top
		const largeParkObj = {}
		for (i = 0; i < largeParks.length; i++){
			largeParkObj[i] = largeParks[i].item	
		}
		console.log(largeParkObj, '<-- this is the large park obj');
		// This algorithm filters park data down to the names of largest parks //

		// this algorithm filters the entire parks array of data down to the park name.
		// then deduplicates the park names, finally declaring a new deduplicated array
		const allParkNames = parkDataJSON.data
		let parkArray = [];
		for (let j = 0; j < allParkNames.length; j++){
			parkArray.push(allParkNames[j][10])
		}
		const parksDeduped = parkArray.filter((item, position) => {
			return parkArray.indexOf(item) == position;
		})
		console.log(parksDeduped);
		// this algorithm filters the entire parks array of data down to the park name.

		res.json({
			status:200,
			largestParksData: largeParkObj,
			allParkNames: parksDeduped,
			credentials: 'include'
		})

	} catch (err){
		next(err)
	}
})

module.exports = router;