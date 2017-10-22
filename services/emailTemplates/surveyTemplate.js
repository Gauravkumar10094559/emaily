const keys= require('../../config/keys');

module.exports = suvery => {
	// return '<div>'+suvery.body+'</div>';
	return '<html><body><div style="text-align: center;"><h3>I would like your input!!</h3><p>Please answer the following question:</p><p>'+suvery.body+'</p><div><a href='+keys.redirectDomain+'/api/surveys/'+suvery.id+'/yes'+'>Yes</a></div><div><a href='+keys.redirectDomain+'/api/surveys/'+suvery.id+'/no'+'>No</a></div></div></body></html> ';
};