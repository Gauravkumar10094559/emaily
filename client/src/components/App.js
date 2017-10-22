import React,{Component} from "react";
import { BrowserRouter, Route } from "react-router-dom";
// BrowserRouter looks at the url and decides the component
import {connect} from 'react-redux';
import * as actions from '../actions'; //all the action creators from actions folder

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

// const Dashboard = () => <h2>Dashboard </h2>;
// const SurveyNew = () => <h2>SurveyNew </h2>;

class App extends Component {

	componentDidMount() {  
		this.props.fetchUser();
	}

	render() {
		// console.log('actions',actions);
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);

//exact={true} is equivalent to exact
//exact is used to go to the exact path and not relative
//header is always visible

// BrowserRouter can have atmost one child

//App.js is the rendering layer control ("""""""""""""""React""""""""""""""" Router)
