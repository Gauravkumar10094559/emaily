const mongoose= require('mongoose');
const {Schema}= mongoose;
const RecipientSchema= require('./Recipient');

const surveySchema = new Schema({
	title:String,
	body:String,
	subject:String,
	recipients:[RecipientSchema],	//4 mb of size
	yes:{
		type:Number,
		default:0
	},
	no:{
		type:Number,
		default:0
	},
	_user:{	// to make it obvious to show the relationship
		type:Schema.Types.ObjectId, //id of that user
		ref:'User'	//users collection
	},
	dateSent:Date,
	lastResponded:Date
});

mongoose.model('Survey',surveySchema);