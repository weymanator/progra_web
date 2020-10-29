const express = require('express');
const path = require("path");

const app = express();

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/curri', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/curri.html'));
});
app.get('/curriJoan',function(req,res){
    res.sendFile(path.join(__dirname, '/public/joan.html'));
    });
app.get('/curriJuan', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/curriJuan.html'));
});

app.get('/claudio', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/claudio_curri.html'));
});

app.listen(7000);
