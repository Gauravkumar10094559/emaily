import axios from "axios";
import { FETCH_USER } from "./types";



export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	// console.log("res",res);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken= token => async dispatch => {
	const res = await axios.post('/api/stripe',token);//token is what sent to the backend you dummy
	dispatch({ type:FETCH_USER, payload:res.data});
};

// export const fetchUser=() => {
// 	return function(dispatch) {	//when the function is executed thats when the request will be made
// 	//now redux-thunk aka the middleware will look anytime an action creator returns
// 	//an action.In this case it's a function it will automatically call it and pass dispatch to
// 	//as arg to this function
// 		axios.get('/api/current_user')
// 			 .then((res) =>
// 			 {
// 			 	console.log(res);
// 				 dispatch({ type:FETCH_USER,payload:res });
// 			 }
// 		);//// once the request is resolved only then will we dispatch the action to all the reducers till then hold on

// 	};
// };

// dispatch function sends the action to all the different reducers in the
// store causing them to instantly recalculate the app state.

//vanilla redux expects to see an action getting returned
// instantly when ever an action is called

// redux-thunk breaks this rule it gives access to a function
// of redux called dispatch to which an action will be passed
// if we call the dispatch function with the action it will
// be sent to all the reducers

// so basically all redux-thunk does is give us access to
// dispatch function
