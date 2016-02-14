/* Ask The Expert    */
/* by Brian Cottrell */
/* 02-13-2016        */

"use strict";

//Add neccessary packages
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');
var http        = require('http');
var https       = require('https');
var fs          = require('fs');
var fs = require('fs');

var redis = require("redis"),
    client = redis.createClient({
        host: "pub-redis-13181.us-east-1-3.7.ec2.redislabs.com",
        port: 13181
    });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.keys("asset:*", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    // client.quit();
});

var urlPrefix = "https://52.87.242.224";

function videoToUrl(video) {
    return urlPrefix + "/videos/" + video;
}

function imageToUrl(image) {
    return urlPrefix + "/questions/" + image;
}

var data = [];

function update(index) {
    var i = index+1;
    client.hget("asset:"+i, "video", function (err, reply) {
        // console.log("video reply: "+reply);
        data[index]["answer"] = videoToUrl(reply);
    });
    client.hget("asset:"+i, "image", function (err, reply) {
        // console.log("video reply: "+reply);
        data[index]["picture"] = imageToUrl(reply);
    });
    client.hget("asset:"+i, "question", function (err, reply) {
        // console.log("video reply: "+reply);
        data[index]["question"] = reply;
    });

}

var i;
for (i=0; i<=9; i++) {
    data.push(
        {
            question: "", 
            picture: "", 
            answer: "", 
            fingerprint: "value",
            rating: 4
        }
    );    
    update(i);
}

for (var i = 0; i < data.length; i++){
    data[i].fingerprint = 'test';
}



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
        appData: data
    });
})

router.route('/upload')
.post(function(req, res){
    var body = ""
    var wstream = fs.createWriteStream('public/uploads/capture.jpg')
    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      // console.log("uploaded: ", body)
      var buf = new Buffer(body, 'base64'); 
      wstream.write(buf);
      wstream.end(function () { 
        console.log('done'); 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('ok');
      });
    });

});

//Add the router and start the server
app.use(router);


var request = require('request');

var Klassy = {};

Klassy.post = function(bodyText, doneFunc) {

  var apiUrl = 'http://api.cortical.io:80/rest/text';
  var requestData = {
    body: bodyText
  };

  var urlParams = {
    retina_name: 'en_associative'
  };

  var options = {
    url: apiUrl,
    // formData: formData,
    qs: urlParams,
    method: "POST",
    json: true,
    headers: {
      'api-key': corticalApiKey,
      "Content-type": "application/json",
      "api-client": "js_1.0",
      "Accept": "application/json",
      // 'Content-Length': Buffer.byteLength(bodyText)
    },
    body: JSON.stringify(requestData)
  };

  console.log(options);

  request.post( options, function(err, res, body) {
    res.on('data', function(chunk) {
      console.log('chunk: ', chunk);
    });

    if (err) {
      // WeChat always returns a 200 anyway
      return console.error('klassy.post failed:', err, body);
    } else {
      return body;
    }
    doneFunc(body);
  });
};

Klassy.post( "some long and interesting piece of maybe a bit weird text", function(body) {
    console.log(body);
});

// Create an HTTP service.
http.createServer(app).listen(port);
console.log('Listening to port:', port);

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);

// setTimeout(function() {
//     console.dir(data);    
// }, 4000);

