const keys= require('../config/keys');
const stripe= require('stripe')(keys.stripeSecretKey);
const requireLogin= require('../middlewares/requireLogin');

module.exports = app => {
//and not requireLogin() because we don't want to call it right away but only when there is some request made to this point where express will itself automatically call middleware and any no of middlwares can be passed
	app.post('/api/stripe',requireLogin ,async (req,res) => {	//to show in front end and this one is to make sure in back end of the token that came back for proper validation with stripe
		// console.log(req.body); //the middleware 

		// if(!req.user) {
		// 	return res.send(401).send({ error:'You must log in! '});//401 is unauthorized
		// }

		const charge = await stripe.charges.create({
			amount:500,
			currency:'usd',
			description:'$5 for 5 credits',
			source:req.body.id//requires token coming back from stripe to complete the follow up request
		});

		// console.log(charge);
		console.log(req.user);// user schema available because of passport middleware 
		req.user+=5;
		const user= await req.user.save();
		res.send(user);

	});
};