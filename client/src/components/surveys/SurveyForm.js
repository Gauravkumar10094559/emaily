//form to add input
import _ from 'lodash';
import React,{Component} from 'react';


import {reduxForm,Field} from 'redux-form';
	// Field is a helper for showing any html input
 //one func/helper from reduxform it is similar in functionality to connect as it connects the state with form
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';

import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

// const FIELDS=[
// 	{ name:"title", label:"Survey Title"},
// 	{ name:"subject", label:"Survey Line"},
// 	// { name:"subject", label:"Survey Line" , noValueErro:'provide subject'}, //for error handling
// 	{ name:"body", label:"Email Body"},
// 	{ name:"recipients", label:"Recipient List"}
// ];

class SurveyForm extends Component {

	renderFields() {

		return _.map(formFields,({label,name}) => {
			return (
				<Field component={SurveyField} 
						key={name}
						type="text"
						label={label}
						name={name}
				/>
			);
		});



		// return (
		// 	<div>
		// 		<Field 
		// 			name="title"
		// 			type="text"
		// 			component={SurveyField}
		// 			label={'Survey Title'}
		// 		/>

		// 		<Field 
		// 			name="subject"
		// 			type="text"
		// 			component={SurveyField}
		// 			label={'Subject Line'}
		// 		/>

		// 		<Field 
		// 			name="body"
		// 			type="text"
		// 			component={SurveyField}
		// 			label={'Email Body'}
		// 		/>

		// 		<Field 
		// 			name="recipient"
		// 			type="text"
		// 			component={SurveyField}
		// 			label={'Recipient List'}
		// 		/>
		// 	</div>
		// );
	}

	render() {
		//this.props.handleSubmit is provided by redux form thats why this.props
		// <form onSubmit={this.props.handleSubmit(()=>this.props.onSurveySubmit())}> here the arrow function is not required and nor the () after onSuveuSubmit so drop it
		//because we don;t wnt to call it at defining but when it is called
		return (
			<div>
				 
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>	
					{this.renderFields()}

						<Link to="/surveys" className="red btn-flat white-text">
							Cancel
						</Link>

					 	<button 
					 		className="teal btn-flat right white-text"
					 		type="submit">
					 		Next
					 	<i className="material-icons right" >done</i>
					 </button>
				</form>
			</div>
		);
	}
}

function validate(values) {	//all the name tags coming off from our form
	const errors={};

	// if(!values.title) {
	// 	errors.title="You must provide a title";//same propery name
	// }

	// if(!values.subject) {
	// 	errors.subject="You must provide a subject";
	// }

	// if(!values.body) {
	// 	errors.body="You must provide a body";
	// }


//use map when u want to return something
//and use forEach when u want to modify 

		errors.recipients=validateEmails(values.recipients || '');	//if undefined then ok


	// _.each(FIELDS,({name, noValueError}) => { //pass this
	_.each(formFields,({name}) => {
		if(!values[name]) { //on the fly if u do values.name that is looking at the "name" in the object
			errors[name]='You must provide a value';
		}
	});

	// errors.recipients=validateEmails(values.recipients || '');	//if undefined then ok

	return errors;	//if errors object is empty then ok if it contains anything then error
//now when this errors obj is returned if it has
//any property on it that is also present in the 
//Fields it's automatically going to make it available
//to that Field on its props
}

export default reduxForm({
	validate,
	form:'surveyForm',
	destroyOnUnmount:false
})(SurveyForm);