module.exports=(req, res, next) => { 	//not used with app because not on every route we want to check for login but on some specific ones
	if(!req.user) {
		return res.status(401).send({error:'You must log in'});
	}
	next();
}