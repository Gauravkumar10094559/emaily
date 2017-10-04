// keys figure out what set of credential to return
//THIS FILE WILL BE COMITTED TO GIT
if (process.env.NODE_ENV === "production") {
	//on heroku process.env.NODE_ENV is production
	//we are in production-return the prod set of keys
	module.exports = require("./prod");
} else {
	//we are in development - return the dev keys !!!
	module.exports = require("./dev");
}
