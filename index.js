//Lets require/import the HTTP module
const http = require('http');

//Lets define a port we want to listen to
const LISTENING_PORT = 8080; 
const TARGET_PORT = 8081; 
const TARGET_HOST = 'localhost';
const REQUEST_COUNT = 10;
const KA_AGENT = new http.Agent({keepAlive : true, keepAliveMsecs : 30000});
const OPTIONS = {
  hostname: TARGET_HOST,
  port: TARGET_PORT,
  method: 'GET',
  agent: KA_AGENT
};

var incomingRequestCount = 0;
//We need a function which handles requests and send response
function handleRequest(request, response){
    requestResultsWaitForAllRequests(response);
//    requestResultsOnTheFly(response);
    console.log('incoming request count [%d]', ++incomingRequestCount);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(LISTENING_PORT, function indicateStartedServer(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", LISTENING_PORT);
});

function requestResultsOnTheFly(outres){
    outres.setHeader('content-type', 'application/json');
    outres.write('{ responses : [');
    var requestsCompleted = 0;
    for (var i=0; i < REQUEST_COUNT; i++) { 
        http.request(OPTIONS, function(inres) {
          inres.setEncoding('utf8');
          inres.on('data', function (chunk) {
              outres.write(chunk);
              ++requestsCompleted;
              if(requestsCompleted == REQUEST_COUNT) {
		  outres.end('] }');
              }else{
                  outres.write(',');
              }
          });
        }).end();
    }
}


function requestResultsWaitForAllRequests(outres){
    var requestsCompleted = 0;
    var results = '{ responses : [';
    for (var i=0; i < REQUEST_COUNT; i++) { 
        var request = http.request(OPTIONS, function(inres) {
          inres.setEncoding('utf8');
          inres.on('data', function (chunk) {
              results += chunk;
              ++requestsCompleted;
              if(requestsCompleted == REQUEST_COUNT) {
                  results += '] }';
		  outres.setHeader('content-type', 'application/json');
                  outres.end(results);
              }else{
                  results += ',';
              }
          });
        }).end();
    }
}
