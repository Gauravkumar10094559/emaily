// it is the parent of form and review form 
import React,{Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

import {reduxForm} from 'redux-form';
class SurveyNew extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state={
	// 		new:true
	// 	};
	// }

	state={		//webpack way
		showFormReview:false
	};

	renderContent() {
		if(this.state.showFormReview) {
			return <SurveyFormReview 
				onCancel={()=> this.setState({showFormReview:false})}
			/>;
		}
		return <SurveyForm 
			onSurveySubmit={()=> this.setState({showFormReview:true})}
		/>;
	}
	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default reduxForm({
	form:'surveyForm'//this is to dump the form values using parent component
})(SurveyNew);