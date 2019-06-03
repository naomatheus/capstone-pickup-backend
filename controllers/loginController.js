loginController.js

router.post('/register', (req, res, next) => {
		try {

			const foundSample = await Sample.findOne({username:req.body.username})

			if (foundSample){
				console.log('username already exists!');
				req.session.loggedIn = false

				res.json({
					status: 200,
					data: 'username already exists',
					credentials: 'include'
				})
			} else {
				console.log('username is unique');
				const password = req.body.pasword
				const hashedPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
				// the hashed password is what we want to store in the DB

				const userDbEntry = {};
				userDbEntry.name = req.body.name;
				userDbEntry.username = req.body.username;
				/// THESE VARIABLES WOULD CORRESPOND WITH REGISTRATION FORM REQUIREMENTS
				// ... zipcode, email, etc
				const createdSample = await Sample.create(userDbEntry)

				res.json({
					status: 200,
					data: createdSample,
					credentials: 'include'
				})

			}


		} catch (err){
			next(err)
		}

})