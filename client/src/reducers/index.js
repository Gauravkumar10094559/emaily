import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';	//reducer is what's available which is a bit ambiguous so renamed it using as
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
	auth:authReducer,	//keys are states
	form:reduxForm,//created automatically by redux form
	surveys:surveysReducer
});