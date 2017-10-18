//when going to prod mode make sure to run build script
//for deployment (npm run build)
//code can be found in build dir static folder

//the build version shows the code at that particular 
//point of time when the npm run build was run

//if you make changes you need to run the commmand 
//again which will record all the latest changes.


import  'materialize-css/dist/css/materialize.min.css';//do give extension and no need for relative since webpack takes care of it(it assumes that if no relative path is given then it's from node_moudules) and no var needed
// import materializeCSS from 'materialize-css/dist/css/materialize.min.css';/
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//createStore will make a new instance of the redux store and inside -1.arg is all the reducers. 2 arg is the initial state 3.arg is the middlewares
// const store=createStore(() =>[],{},applyMiddleware());//redux store (to give the ability to access to data from a deeply nested component)
const store=createStore(reducers,{},applyMiddleware(reduxThunk));//redux store (to give the ability to access to data from a deeply nested component)

ReactDom.render(
	<Provider store={store}>	
		<App />
	</Provider>,
	document.querySelector('#root')
);

// console.log('Stripe keu is', process.env.REACT_APP_STRIPE_KEY);
// console.log('eNV IS keu is', process.env.NODE_ENV);



// Provider is a react component that makes the store accessible to every component in the app
//as the name suggests (provider) it gives access to its child components of application state.

//how does re-rendering occur on state change??
//it's because of the provider which tells all of it's child components to
//rerender whenever there is a change in the state.

// index.js is the data layer control ("""""""""""""""redux""""""""""""""")

//and make sure to name it index.js because thats
//what react has decided to listen to






























// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">ma name is pewdiepie</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a href="/auth/google"> Sign in with Google </a>
//       </div>
//     );
//   }
// }

// export default App;

// // relative path will add this path in front of the client server which is not where we are making the request for oauth
// //to blend the front-end server and backend server
// //use proxy in package.json


// //in dev there will be create-react-app server but in prod mode all of the code will reside in the build dir
// //which is converted using npm run build and there will be no react server there.just node/expres api  
