const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello');
});
app.get('/404',(req,res)=>{
    res.sendStatus(404);
});

app.get('/name',(req,res)=>{
    res.json({
        name:'Mike',
        age:20
    });
});

app.listen(3000);
module.exports.app = app;
// app.get('/')