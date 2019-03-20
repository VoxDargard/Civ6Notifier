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
  somin: '287626849352286208',
  Minski: '546389463052582933',
  Forke: '274529125010767872',
  Olovain: '284027402596646914',
  TheLaggingMan: '362278244017504258',
  DarkCiv: '327709450058334208',
  'Lord Calderon': '366708961338195971',
  'Dr.Friedlich_Loesung': '288766117827182604',
  'Sol': '231450321925177354',
  'Jesaya':'326480164827561984',
  'funny_noodles':'362281149218947073'
  
};

var serverMapping = {
  "Cloud-01": 'https://discordapp.com/api/webhooks/557468076115886110/xbdf2p2RFMJR4XFi-oCo1lDoaVX8lujLAQIZemtPT2BH9g9ly4m25t7FUSqORj3-vJK1',
  'Cloud-02_CGG_KAKEBUKE': 'https://discordapp.com/api/webhooks/557822028015730703/kvzq_y2PCS0WKG5xJRB2Ay15vTOPn3pVXXUXsSap_IMlHC8jKT8Ls7TbbdAXkgNkcd-g',
  "somin's Game": 'https://discordapp.com/api/webhooks/557468076115886110/xbdf2p2RFMJR4XFi-oCo1lDoaVX8lujLAQIZemtPT2BH9g9ly4m25t7FUSqORj3-vJK1'
}; 
 


// Handle requests from IFTTT
app.post("/", upload.array(),function (req, response) {
  console.log("Request received from IFTTT");
  console.log("Triggering multiple IFTTT services");
//  for(var i=0; i<10; i++){
    
//  }
  
  console.log( req.body );
  console.log ( req.body.value2);
  var playerId = playerMapping[req.body.value2];
  var server = serverMapping[req.body.value1];
  console.log( playerId);
  
  checkForTrigger( server, playerId );
  
  console.log("Done triggering.");
  response.end();  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Loops through each event and where it finds a value for it in .env it will make a request to IFTTT using it
function checkForTrigger( server, playerId ){
  var triggerEvent;
  
  request({ 
    uri: server,
    body: { "content":"Hey <@"+ playerId + ">, it's time to take your turn!" },
    json: true,
    method: 'POST'
  }, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       console.log(body); // Show the response from Habitica
     }
    else {
      console.log(response.statusCode);
      console.log(body);
    }
  });
  
  /*
  triggerEvent = "somin"
  if(triggerEvent){
    console.log("Event: " + triggerEvent + " Body: " + newBody);
    // Make a request to baseURL + triggerEvent + withKey + iftttId, which is the complete IFTTT Maker Request URL
    request(baseURL + triggerEvent + withKey + iftttId, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the response from IFTTT
      } else {
        console.log(baseURL + triggerEvent + withKey + iftttId + ": "+error); // Show the error
      }
    });
  }*/
}