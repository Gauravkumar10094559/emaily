const express = require('express'); // common js modules (node has support for common js modules only)
// import express from 'express'; // es2015 modules (for front end)

const app=express();// app object represents underlying running express server

app.get('/',(req,res)=> {	// handle incoming http request
	res.send({bye:'there'});
});



const PORT= process.env.PORT;

app.listen(PORT || 5000 ,() => {
	console.log('server has started');
});	// telling node to listen on this port