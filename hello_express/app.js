var express = require('express');   

var app = express(); 

app.set('port', 4000);

app.get('/', function(req, res) {
    res.send('Express works');
});

app.get('/hello', function(req, res) {
    res.send('hello ...');
});

app.listen(app.get('port'), function(){
    console.log("Server listening..." +app.get('port'));
});
