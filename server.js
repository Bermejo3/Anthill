const express = require('express');
const app = express();

app.use(express.static(__dirname + 'dist/Anthill'));
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + 'dist/Anthill'));
})

app.listen(process.env.PORT || 8080)