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
    response.write('{ responses : [');
    rrequestResultsWaitForAllRequests(response, function finish(){
        response.end('] }');
    });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(LISTENING_PORT, function indicateStartedServer(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", LISTENING_PORT);
});

function requestResultsOnTheFly(outres, done){
    var requestsCompleted = 0;
    var requestsCount = 10;
    for (var i=0; i < requestsCount; i++) { 
        http.request(OPTIONS, function(inres) {
          inres.setEncoding('utf8');
          inres.on('data', function (chunk) {
              outres.write(chunk);
              ++requestsCompleted;
              if(requestsCompleted == requestsCount) {
                  done();
              }else{
                  outres.write(',');
              }
          });
        }).end();
    }
}


function requestResultsWaitForAllRequests(outres, done){
    var requestsCompleted = 0;
    var requestsCount = 10;
    var results = ;
    for (var i=0; i < requestsCount; i++) { 
        var request = http.request(OPTIONS, function(inres) {
          inres.setEncoding('utf8');
          inres.on('data', function (chunk) {
              outres.write(chunk);
              ++requestsCompleted;
              if(requestsCompleted == requestsCount) {
                  done();
              }else{
                  outres.write(',');
              }
          });
        });
        requests
    }
}
