const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {

	if(emails[emails.length-1]===",") {
		emails=emails.slice(0,emails.length-1);
	}
	// console.log(emails);
	const invalidEmails= emails
							.split(',')
							.map(email=> email.trim())
							.filter(email => re.test(email)===false );

	// console.log(invalidEmails);
	if(invalidEmails.length) {
		return `These emails are invalid ${invalidEmails}`;
	}

	return;
};

