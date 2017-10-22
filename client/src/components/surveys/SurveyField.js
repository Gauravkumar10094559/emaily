//single lable and text input

import React from 'react';
//double nesting
export default ({input,label,meta:{error,touched}}) => {	//props is given by reduxform
	// console.log(props);//u can see all the event handlers that redux form is watching over to record any change for necessary rendering
	// console.log(meta);//to see error in it
	return (
		<div>
			<label>{label}</label>
			<input 
				style={{marginBottom:'5px'}}
				{...input}	// this will take all those event handlers and spread them here 
				//totally equivalent to onBlur={input.onBlur }
			/>
			<div className="red-text" style={{marginBottom:"20px"}}>
			{touched && error}
			</div>
		</div>
	);	
};