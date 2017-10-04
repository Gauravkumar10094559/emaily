const passport = require("passport");

module.exports = app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			//automatically matches with above code
			scope: ["profile", "email"] //what access we want to have
		})
	);

	app.get("/auth/google/callback", passport.authenticate("google")); //the one with code

	app.get('/api/logout',(req,res) => {
		req.logout();
		res.send(req.user);
	});

	app.get("/api/current_user", (req, res) => {
		// res.send(req.session);	//dig.015 cookie session assigns extracted data to req.session.then passport picks it up and deserialize it.
		// sets a cookie with the user's info
        // req.session.user = user;
		res.send(req.user);	//to make sure someone has gone through all the process
	});



};
