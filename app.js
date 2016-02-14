/* Ask The Expert    */
/* by Brian Cottrell */
/* 02-13-2016        */

//Add neccessary packages
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');
var http        = require('http');
var https       = require('https');
var fs = require('fs');

var question1 = 'A peice of Granite rock has a mass of 15.5g and a volume of 6.01cm^3. What is the density?';
var question2 = 'If an equlilateral triangle has a height of 8, find the length of each side';
var question3 = 'The Derivative f\'(x) = lim h->0 f(x-h) - f(x)/h Using the definition of the derivative, calculate the derivative of f(x) = x^2 + x - 3';
var question4 = 'A peice of Granite rock has a mass of 15.5g and a volume of 6.01cm^3. What is the density?';
var question5 = 'A peice of Granite rock has a mass of 15.5g and a volume of 6.01cm^3. What is the density?';
var question6 = 'A peice of Granite rock has a mass of 15.5g and a volume of 6.01cm^3. What is the density?';
var question7 = 'A peice of Granite rock has a mass of 15.5g and a volume of 6.01cm^3. What is the density?';
var question8 = 'A peice of Granite rock has a mass of 15.5g and a volume of 6.01cm^3. What is the density?';
var question9 = 'A peice of Granite rock has a mass of 15.5g and a volume of 6.01cm^3. What is the density?';
var question10 = 'A peice of Granite rock has a mass of 15.5g and a volume of 6.01cm^3. What is the density?';

var image1 = 'https://52.87.242.224/questions/question_1.png';
var image2 = 'https://52.87.242.224/questions/question_2.png';
var image3 = 'https://52.87.242.224/questions/question_3.png';
var image4 = 'https://52.87.242.224/questions/question_1.png';
var image5 = 'https://52.87.242.224/questions/question_1.png';
var image6 = 'https://52.87.242.224/questions/question_1.png';
var image7 = 'https://52.87.242.224/questions/question_1.png';
var image8 = 'https://52.87.242.224/questions/question_1.png';
var image9 = 'https://52.87.242.224/questions/question_1.png';
var image10 = 'https://52.87.242.224/questions/question_1.png';

var video1 = 'https://52.87.242.224/videos/video_1.mp4';
var video2 = 'https://52.87.242.224/videos/video_2.mp4';
var video3 = 'https://52.87.242.224/videos/video_3.mp4';
var video4 = 'https://52.87.242.224/videos/video_1.mp4';
var video5 = 'https://52.87.242.224/videos/video_1.mp4';
var video6 = 'https://52.87.242.224/videos/video_1.mp4';
var video7 = 'https://52.87.242.224/videos/video_1.mp4';
var video8 = 'https://52.87.242.224/videos/video_1.mp4';
var video9 = 'https://52.87.242.224/videos/video_1.mp4';
var video10 = 'https://52.87.242.224/videos/video_1.mp4';

var fingerprint1 = '';

var appData = [
    {
        question: question1, picture: image1, answer: video1, fingerprint: fingerprint1, rating: rating1},
        question: question2, picture: image2, answer: video2, fingerprint: fingerprint2, rating: rating2},
        question: question3, picture: image3, answer: video3, fingerprint: fingerprint3, rating: rating3},
        question: question4, picture: image4, answer: video4, fingerprint: fingerprint4, rating: rating4},
        question: question5, picture: image5, answer: video5, fingerprint: fingerprint5, rating: rating5},
        question: question6, picture: image6, answer: video6, fingerprint: fingerprint6, rating: rating6},
        question: question7, picture: image7, answer: video7, fingerprint: fingerprint7, rating: rating7},
        question: question8, picture: image8, answer: video8, fingerprint: fingerprint8, rating: rating8},
        question: question9, picture: image9, answer: video9, fingerprint: fingerprint9, rating: rating9},
        question: question10, picture: image10, answer: video10, fingerprint: fingerprint10, rating: rating10}
    ]

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('ssl/server.key'),
  cert: fs.readFileSync('ssl/server.crt')
};

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
        conciergeKey: citrixApiKey,
        data: appData
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
// Create an HTTP service.
http.createServer(app).listen(port);
console.log('Listening to port:', port);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
