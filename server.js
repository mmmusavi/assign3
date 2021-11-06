const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/data',(req,res)=>{

    let data = fs.readFileSync('data.json');
    let parsed_data = JSON.parse(data);

    res.send(parsed_data);

});

app.post('/upload',(req,res)=>{

    var id =req.body.id;
    var val =req.body.val;

    let data = fs.readFileSync('data.json');
    let parsed_data = JSON.parse(data);

    parsed_data.terms[id].importance=val;

    fs.writeFileSync('data.json',JSON.stringify(parsed_data));

    res.sendStatus(200);

});


let listener = app.listen(3000,()=>console.log('server is running...'));