module.exports=(req, res, next) => { 	//not used with app because not on every route we want to check for login but on some specific ones
	if(!req.user && req.user.credits < 1) {
		return res.status(403).send({error:'Not enough credits!'});
	}
	next();
}