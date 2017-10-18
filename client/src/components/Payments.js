import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		// debugger;
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={400}
				// token={token => console.log(token)}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">
					Add credits
				</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);

//400 is amount in cents
//token (callback) represents the charge
//token is what comes back from stripe when user
//has entered their credit card details