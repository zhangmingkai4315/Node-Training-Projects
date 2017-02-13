const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose')
const {User,Todo} = require('./models');
const Port = process.env.Port||3000;

const app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    if(req.body){
        let todo = new Todo(req.body)
        todo.save().then((data)=>{
            res.status(200).send(data);
        },(err)=>{
            res.status(400).send(err);
        })
    }else{
        res.status(400)
    }
});

app.get('/todos',(req,res)=>{
    Todo.find({}).then((data)=>{
        res.status(200).json({
            todos:data
        })
    },(err)=>{
        res.status(500).send({
            error:err
        }) 
    });
});

app.listen(Port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Express app is listen at port ${Port}`);
    }
})

module.exports = {app};