const express = require("express"); // common js modules (node has support for common js modules only)(in common js modules we can execute some code before requiring stuff not possible in es2015 modules)
// import express from 'express'; // es2015 modules (for front end)
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const keys = require("./config/keys");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser"); //its a middleware so make use of app.use
require("./models/user");
// const passportConfig=
require("./services/passport"); // we just want that code to execute and we dont want it back
// const authRoutes=require('./routes/authRoutes');

const app = express(); // app object represents underlying running express server

app.use(bodyParser.json());//anytime a post, put, patch request comes this middleware will parse the request and put it in req.body

app.use(
	//our own middleware and whatever function we provide to it will be called on "every route"  i repeat every
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //for how long it will survive
		keys: [keys.cookieKey] // what to use for encryption
	})
);

app.use(passport.initialize()); //when a request comes in these three middleware will make some minor adjustments accordingly. refer to the diag.015
app.use(passport.session()); //preprocessing on requests before they are sent out to different route handlers (get,post,...) ex. login middleware

// authRoutes(app);
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

mongoose.connect(keys.mongoURI);





if(process.env.NODE_ENV==='production') {
	//Express will serve up "production assets"
	//like our main.js file or main.css file

	app.use(express.static('client/build'));

	//Express will serve up the index.html file
	//if it doesn't recognize the route
	//when we come over here the request hasn't been
	//caught up until now.
	//it wasn't available in authRoutes , billingRoutes
	//or inside client/build dir
	//so just catch anything there is and give the index.html 
	const path= require('path');
	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
}






















// app.get('/',(req,res)=> {	// handle incoming http request
// 	res.send({bye:'there'});
// });

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: keys.googleClientID,
// 			clientSecret: keys.googleClientSecret,
// 			callbackURL: "/auth/google/callback"
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			console.log("access token", accessToken); ///proof we are allowed to use user info//when user is sent back to the server and for data comes back of user using code
// 			console.log("refresh token ", refreshToken); // to referesh access token
// 			console.log("profile ", profile); //user info
// 		}
// 	)
// ); // new instance of googlestartegy

// app.get(
// 	"/auth/google",
// 	passport.authenticate("google", {
// 		//automatically matches with above code
// 		scope: ["profile", "email"] //what access we want to have
// 	})
// );

// app.get("/auth/google/callback", passport.authenticate("google")); //the one with code

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	// for deployment use env.port and not hardcoded port
	console.log("Server has started");
});

// telling node to listen on this port

//sessions mean keeping the users logged in even when they have refreshed.

//prod

//clientId   464560114914-d46hh8476kao5u4s634s6c3gqd9ln3cd.apps.googleusercontent.com

//secret   ItOqS1toWLKn81DipSAxsuyb

//mongodb://gkprod:password@ds163294.mlab.com:63294/gaurav-emaily-prod

//use concurrently to execute two commands in cmd at once --prefix is to look at client folder 
//use npm run dev
