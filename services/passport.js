const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.serializeUser((user, done) => {
	//to convert id in to cookie
	done(null, user.id); //we use user.id because a user may or may not have googleID (it can have fb id) but it will have our mlab assigned id. and u can access directly using .id
});

passport.deserializeUser((id, done) => {
	// to use cookie to get back the id
	User.findById(id) //find which id user belongs to
		.then(user => {
			done(null, user);
		});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			proxy: true,
			callbackURL: "/auth/google/callback"
			//heroku uses proxy to identify the server assigned to use
			//thats where the https is changed to http
			// two sol-1.change relative path to absolute(https://flow-df.herorku.com/auth/google)
			//2.add tell google to let it happen(add another google strategy)
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log("access token", accessToken); ///proof we are allowed to use user info//when user is sent back to the server and for data comes back of user using code
			// console.log("refresh token ", refreshToken); // to referesh access token
			// console.log("profile ", profile); //user info

			User.findOne({
				//find one user
				googleId: profile.id
			}).then(existingUser => {
				//promise
				if (existingUser) {
					// console.log('already exists');
					done(null, existingUser); //carry on with authentication now we are done with users.null is for no errors
				} else {
					new User({
						googleId: profile.id
					})
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
); // new instance of googlestartegy
