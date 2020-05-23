var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var multer = require('multer'); // v1.0.5
var app = express();
var upload = multer();
app.use(express.static('views'));
app.use(bodyParser.json());


// ############################################################
// Map the Steam name to the discord Id to @mention the players
//
var playerMapping = {
  'Vox': '69287046484590592',
  'esol927': '231933192548909056'
  'Single Doubt': '622509633931575307'
  'Carneggy' : '235319671329521665'
  'Kaamoku' : '351394814962434068'
};

// #################################################################
// Map game name to different bots so you can have channels per game
//  
var serverMapping = {
  "Vox's Game": 'https://discordapp.com/api/webhooks/713050609913430058/6ZCO-2Xa_pmxEt3km70UHwcH0rY5z9lzREogdsikXnwiHyR-3iP_OKWp30TSmCUFvWH7',
  "DifferentCloudGame": 'https://discordapp.com/...etc webhooklinkhere'
}; 

// #################################################################
// Debug webhook if something goes wrong ( eg server or player is not found in arrays above )
//
var debugserver = 'https://...webhook link for when things go wrong';

 



app.post("/", upload.array(),function (req, response) {
  
  console.log( req.body );
  console.log ( req.body.value2);
  var playerId = playerMapping[req.body.value2];
  var server = serverMapping[req.body.value1];
  var gamename = req.body.value1;
  
  console.log( playerId);
  var turnNumber = req.body.value3;
  
  if ( playerId && server )
  {
    var content = "Hey <@"+ playerId + ">, it's time to take your turn #" + turnNumber + " in '" + gamename +"'!";
    sendMessage( server, content);
    console.log("Done triggering.");
  }
  else
  {
    var content = "Error in data, missing game or player?\n" + req.body;
    sendMessage( debugserver,content );
    console.log( content );
  }

  response.end();  
});

function sendMessage( server, content )
{
	request({ 
    uri: server,
    body: { "content":content},
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
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});