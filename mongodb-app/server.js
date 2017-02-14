const env = process.env.NODE_ENV||'development';
if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoAppDev';
}else if (env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoAppTest';
}else if(env === 'production'){
    process.env.PORT = 80;
    process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoApp';
}

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } =require('mongodb');
const { mongoose } = require('./db/mongoose')
const {User,Todo} = require('./models');
const Port = process.env.Port||3000;
const _ = require('lodash');
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

app.get('/todo/:id',(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400);
        return
    }
    Todo.find({_id:ObjectID(id)}).then((data)=>{
        res.status(200).json({
            todo:data
        });
    },(err)=>{
        res.status(500).send({
            error:err
        });
    });
});

// post /users
app.post('/users',(req,res)=>{
    if(req.body){
        let body = _.pick(req.body,['email','password']);
        let user = new User(body);
        user.save()
        .then(user=>{
            return user.generateAuthToken();
        })
        .then(token=>{
            console.log(token)
            res.header('x-auth',token).send(user.toJSON());
        })
        .catch((e)=>{
            res.status(400).json({
                error:e
            });
        });
    }else{
        res.status(400).send('no data posted.');
    }
});



app.listen(Port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Express app is listen at port ${Port}`);
    }
})

module.exports = {app};