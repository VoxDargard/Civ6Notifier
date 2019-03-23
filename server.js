var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var multer = require('multer'); // v1.0.5
var app = express();
var upload = multer();
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
  "somin's Game": 'https://discordapp.com/api/webhooks/558026909577904139/_Fay9CuO_XDcspX_mmNXERgthwO1FRXx7XG7q8_XtE7JHvzlLvvZ0tuyYwrRnhVfPAM4',
  "TestGame": 'https://discordapp.com/api/webhooks/558026909577904139/_Fay9CuO_XDcspX_mmNXERgthwO1FRXx7XG7q8_XtE7JHvzlLvvZ0tuyYwrRnhVfPAM4'
}; 
 
var debugserver = 'https://discordapp.com/api/webhooks/558026909577904139/_Fay9CuO_XDcspX_mmNXERgthwO1FRXx7XG7q8_XtE7JHvzlLvvZ0tuyYwrRnhVfPAM4';

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