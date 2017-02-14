
const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } =require('mongodb');
const { mongoose } = require('./db/mongoose')
const {User,Todo} = require('./models');
const {authMiddleware} = require('./middleware');
const Port = process.env.Port||3000;
const _ = require('lodash');
const app = express();

app.use(bodyParser.json());

app.post('/todos',authMiddleware,(req,res)=>{
    if(req.body){
        let todo = new Todo({
            text:req.body.text,
            _creator:req.user._id
        });
        todo.save().then((data)=>{
            res.status(200).send(data);
        },(err)=>{
            res.status(400).send(err);
        })
    }else{
        res.status(400)
    }
});



app.get('/todos',authMiddleware,(req,res)=>{
    Todo.find({
        _creator:req.user._id
    }).then((data)=>{
        res.status(200).json({
            todos:data
        })
    },(err)=>{
        res.status(500).send({
            error:err
        }) 
    });
});

app.get('/todos/:id',authMiddleware,(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400);
        return
    }
    Todo.find({_id:ObjectID(id), _creator:req.user._id}).then((data)=>{
        res.status(200).json({
            todo:data
        });
    },(err)=>{
        res.status(500).send({
            error:err
        });
    });
});

app.delete('/todos/:id',authMiddleware,(req,res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400);
        return
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            res.status(404).json({
                    error:'NotFound',id  
            });
        }else if(todo._creator.toHexString()!==req.user._id.toHexString()){
             res.status(401).json({
                    error:'NotAllowed',id  
            });
        }else{
            res.status(200).json({
                    error:null,
                    success:true,
                    id   
            });
        }

    },(err)=>{
       throw Primise.reject(err);
    }).catch((e)=>{
        res.status(500).send({
                    error:e
        });
    });
});

app.patch('/todos/:id',authMiddleware,(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        res.status(400);
        return
    }
    if(_.isBoolean(body.completed)&&body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set:body},{new:true})
        .then((todo)=>{
        
        if(!todo){
            res.status(404).json({
                    error:'NotFound',
                    id  
            });
        }else{
            res.status(200).json({
                    error:null,
                    success:true,
                    todo   
            });
        }

    },(err)=>{
       throw Primise.reject(err);
    }).catch((e)=>{
        res.status(400).send({
                    error:e
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

// login 
app.post('/login',(req,res)=>{
    let userObj;
    if(req.body){
        let body = _.pick(req.body,['email','password']);
        User.findByCredentials(body.email,body.password)
        .then(user=>{
            userObj = user;
            return user.generateAuthToken();
        })
        .then(token=>{
            // console.log(userObj)
            res.header('x-auth',token).status(200).send({
                _id:userObj.id,
                email:userObj.email
            });
        })
        .catch((e)=>{
            res.status(401).json({
                error:e
            });
        });
    }else{
        res.status(400).send('no data posted.');
    }
});
// get /users/me
app.get('/users/me',authMiddleware,(req,res)=>{
    res.json(req.user);
});

app.delete('/users/me/token',authMiddleware,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.header('x-auth','').send();
    }).catch(e=>{
        res.status(400).send();
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