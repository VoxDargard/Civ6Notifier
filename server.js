// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var multer = require('multer'); // v1.0.5

var app = express();
var iftttId;
var baseURL = "https://maker.ifttt.com/trigger/";
var withKey = "/with/key/";


var upload = multer();
// Get the Id from IFTTT Maker URL
//if(!process.env.IFTTT_MAKER_URL)
//  console.log("You need to set your IFTTT Maker URL - copy the URL from https://ifttt.com/services/maker/settings into the .env file against 'IFTTT_MAKER_URL'");
//else
  iftttId = process.env.IFTTT_MAKER_URL.split('https://maker.ifttt.com/use/')[1];
iftttId = "clazG-wwuSPmF8lae-fY3v";
console.log(iftttId); 
// Show the homepage
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Handle requests from IFTTT
app.post("/", upload.array(),function (request, response) {
  console.log("Request received from IFTTT");
  console.log("Triggering multiple IFTTT services");
//  for(var i=0; i<10; i++){
    checkForTrigger(0);
//  }
   
//  console.log( request.body );

  
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