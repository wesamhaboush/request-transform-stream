//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8081; 

var responseCount = 0;

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end(JSON.stringify({response : ++responseCount }));
    console.log('served [%d] requests', responseCount);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function indicateStartedServer(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

