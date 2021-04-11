const express = require('express');
const app = express();

app.use(express.static(__dirname + '/Anthill'));
app.get('/*', function(req, res){
    res.sendFile("index.html", {root: __dirname + '/Anthill'});
})

app.listen(process.env.PORT || 8080)