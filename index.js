var http = require('http');
var port = 3000; 
var host = "localhost"


var server = http.createServer(function (req, res) {
    //check the URL of the current request
    // localhost:3000/   
    if (req.url == '/') { 
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });  
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }
    // localhost:3000/admin   
    else if (req.url == "/admin") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is <b>admin</b> Page.</p></body></html>');
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Invalid Request!');
    }

});


server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});