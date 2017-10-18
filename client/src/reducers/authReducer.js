import { FETCH_USER} from '../actions/types';

export default function (state=null, action) { //give initial state you fool
	
	// console.log("action.payload",action.payload);
 
	switch(action.type) {

		case FETCH_USER:
			return action.payload || false; //empty string is considered is false

		default:
			return state;
	}
}