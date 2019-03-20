// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var multer = require('multer'); // v1.0.5

var app = express();

var baseURL = "https://maker.ifttt.com/trigger/";
var withKey = "/with/key/";
var iftttId = "clazG-wwuSPmF8lae-fY3v";

var upload = multer();

// Show the homepage
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));
app.use(bodyParser.json());


var playerMapping = {
    somin: '12345',
    testName: 'testvalue'
};



// Handle requests from IFTTT
app.post("/", upload.array(),function (request, response) {
  console.log("Request received from IFTTT");
  console.log("Triggering multiple IFTTT services");
//  for(var i=0; i<10; i++){
    checkForTrigger(0);
//  }
  
  console.log( request.body );
  console.log ( request.body.value1);
  var myVal = playerMapping[request.body.value1];
  console.log( myVal);
  
  
  
  console.log("Done triggering.");
  response.end();  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Loops through each event and where it finds a value for it in .env it will make a request to IFTTT using it
function checkForTrigger(trigger){
  var triggerEvent;
  
  triggerEvent = "somin"
  if(triggerEvent){
    console.log(triggerEvent);
    // Make a request to baseURL + triggerEvent + withKey + iftttId, which is the complete IFTTT Maker Request URL
    request(baseURL + triggerEvent + withKey + iftttId, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the response from IFTTT
      } else {
        console.log(baseURL + triggerEvent + withKey + iftttId + ": "+error); // Show the error
      }
    });
  }
}