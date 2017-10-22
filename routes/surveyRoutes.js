const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey=mongoose.model('Survey');
 
module.exports = app => {



  app.get('/api/surveys', requireLogin, async (req, res) => {
  	//remember everything of user is on req.user
    const surveys = await Survey.find({ _User: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _User: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};






// const _=require('lodash');
// const Path= require('path-parser');//to bisesct the url and get id and choice 
// const {URL} = require('url');//integrated module is for parsing url's 
// const mongoose= require('mongoose');//to skirt the errors caused in dev mode idk something like that
// const requireLogin= require('../middlewares/requireLogin');
// const requireCredits= require('../middlewares/requireCredits');
// const Mailer= require('../services/Mailer');
// const surveyTemplate= require('../services/emailTemplates/surveyTemplate');
// const Survey=mongoose.model('Survey');

// module.exports=app=> {

// 	app.get('/api/surveys/:surveyId/:choice',(req,res) => {
// 		res.send('Thanks for voting!');
// 	});
// const p= new Path('/api/surveys/:surveyId/:choice');
// 	app.post('/api/surveys/webhooks',(req,res)=>{
// 		// console.log(req.body);
// 		// res.send({});
// 		const events=_.chain(req.body)
// 		// const events=_.map(req.body,event=>{
// 		// const events=_.map(req.body,({email,url})=>{
// 		.map(({email,url})=>{
// 			// const pathname=new URL(url).pathname;
			
			
// 			// console.log(p.test(pathname)); //this will have id and choice
// 			// const match=p.test(new URL(url).pathname);
// 			p.test(new URL(url).pathname);


// 			if(match) {
// 				return {
// 					email,
// 					surveyId:match.surveyId,
// 					choice:match.choice
// 				}
// 			}
// 		})

// 		// console.log(events);
// 		// [ { email: 'gauravkumar10094559@gmail.com',
//   //   surveyId: '59eb6e7db1d45b041484655f',
//   //   choice: 'no' } ]

//   		// const compactEvents=_.compact(events);//only event objects no undefined /n ull
//   		.compact()//only event objects no undefined /n ull

//   		// const uniqueEvents=_.uniqBy(compactEvents,'email','surveyId');
//   		.uniqBy('email','surveyId')
//   		.each(({surveyId,email,choice})=>{
// //   			email='a@a.com';
// // choice='yes'||'no';
// //no async await because sendgrid is not waiting for some response
// 			Survey.updateOne({ //search and update one this is the searching part
// 				_id:surveyId,
// 				recipients:{
// 					$elemMatch:{
// 						email:email,
// 						responded:false
// 					}
// 				}
// 			},{ //this is the update part
// 				$inc:{ [choice]:1 },	//$inc and set are mongo operators
// 				$set:{'recipients.$.responded':true}, //$ is to find the one using $elemMatch
// 				lastResponded:new Date()
// 			}).exec();//to execute this query

// //everything on monogdb side and no interaction with 
// //our side so good
//   		})
//   		.value();

//   		console.log(events);

//   		res.send({});

// 	});
	
// 	app.post('/api/surveys',requireLogin,requireCredits,async (req,res)=>{ //order matters
		
// 		const {title,subject,body,recipients} = req.body;

// 		const survey=new Survey({
// 			title,
// 			subject,
// 			body,
// 			// recipients:recipients.split(',').map(email=>{return {email:email}})
// 			recipients: recipients.split(',').map(email=> ({ email:email.trim() })),
// 			_user:req.user.id,
// 			dateSent:Date.now()
// 		});

// 		const mailer = new Mailer(survey, surveyTemplate(survey));
// 		try{
// 			await mailer.send();
// 			await survey.save();
// 			req.user.credits-=1;
// 			const user = await req.user.save();
// 			res.send(user); //to update the headers
// 		}
// 		catch(err) {
// 			// console.log(err);
// 			res.status(422).send(err);//something with what u sent
// 		}

// 	});
// };