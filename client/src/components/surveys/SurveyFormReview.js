//final show before submission
import _ from 'lodash';
import React from 'react';
import {connect } from 'react-redux'; //to get the data
//of the form we use connect because we know behind
//the scenes it is using redux app statef
import formFields from './formFields';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions';
//history is from withRouter
const SurveyFormReview=({onCancel,formValues, submitSurvey, history}) => {

	const reviewFields=_.map(formFields,({name,label})=>{
		return(
			<div key={name}>
				<label>{label}</label>
				<div>
					{formValues[name]}
				</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries!</h5>
			
			{reviewFields}

			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}
			>
				Back
			</button>

			<button 
			onClick={()=> submitSurvey(formValues,history)}
			className="green white-text btn-flat right">
				Send Survey
				<i className="material-icons right">
					email
				</i>
			</button>

		</div>
	);
}

function mapStateToProps(state) {
// console.log(state); //inside surveyForm
	return {
		formValues:state.form.surveyForm.values//this is available as props to the component in connect
	};

}

export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));

//submitSurvey is also a prop so pass it to the component