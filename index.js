//Lets require/import the HTTP module
const http = require('http');

//Lets define a port we want to listen to
const LISTENING_PORT = 8080; 
const TARGET_PORT = 8081; 
const TARGET_HOST = 'localhost';

const OPTIONS = {
  hostname: TARGET_HOST,
  port: TARGET_PORT,
  method: 'GET',
};


//We need a function which handles requests and send response
function handleRequest(request, response){
    console.log('got request');
    requestResults(response, function finish(){
        response.end('finished.');
    });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(LISTENING_PORT, function indicateStartedServer(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", LISTENING_PORT);
});

function requestResults(outres, done){
    console.log('making a request');
    var req = http.request(OPTIONS, function(inres) {
      console.log('STATUS: ' + inres.statusCode);
      console.log('HEADERS: ' + JSON.stringify(inres.headers));
      inres.setEncoding('utf8');
      inres.on('data', function (chunk) {
          outres.write(chunk);
          console.log('BODY: ' + chunk);
          done();
      });
    }).end();
}
