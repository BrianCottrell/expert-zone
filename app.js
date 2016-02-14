/* Ask The Expert    */
/* by Brian Cottrell */
/* 02-13-2016        */

//Add neccessary packages
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');

//Set port to 8080
var port        = process.env.PORT || 8080;
//Router for making http requests
var router      = express.Router();

var hpApiKey = '438b3ec2-75ab-4201-b2f2-db10d0c40aa1';
var corticalApiKey = 'e1ed8d60-d2ba-11e5-8378-4dad29be0fab';
var citrixApiKey = 'MTMzMzs0Njk=-1bfgt2uvqhkji1xwhz76ua0g831u1iwoyg3of61tnoe4e5wmd3qc4ifg4764ylr1';

app.use(express.static('public'));

//Configure body body-parser
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

//Configure view engine and directory path
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/views')));

//Specify routes
router.route('/')
//Called when a user navigates to the home page
.get(function(req, res){
    res.status(200).render('home', {
    	hpKey: hpApiKey,
        corticalKey: corticalApiKey,
        conciergeKey: citrixApiKey
    });
})
//Called when a user makes a post to the home page
// .post(function(req, res){
//     var profile = new Profile();
//     profile.name = req.body.name;
//     profile.email = req.body.email;
//     profile.objective = req.body.objective;
//     profile.assessment = assessmentId;
//     profile.personality1 = req.body.personality1;
//     profile.personality2 = req.body.personality2;
//     profile.category = req.body.category;
//     profile.hacker = req.body.hacker;
//     profile.pets = req.body.pets;
//     profile.quiet = req.body.quiet;
//     profile.save(function(err){
//         if(err){
//             console.log(err);
//         }
//     });
// });
//Add the router and start the server
app.use(router);
app.listen(port);
console.log('Listening to port:', port);