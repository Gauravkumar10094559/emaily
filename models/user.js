const mongoose = require("mongoose");
// const Schema=mongoose.Schema; or write using new syntax
const { Schema } = mongoose; //destructuring

const userSchema = new Schema({
	googleId: String
});

mongoose.model("User", userSchema);
