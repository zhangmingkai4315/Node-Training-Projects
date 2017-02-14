const {ObjectID} = require('mongodb');
const {Todo,User} = require('../models');
const jwt = require('jsonwebtoken');
const SECRECT = 'secret_info';



const user_one_id = new ObjectID();
const user_two_id = new ObjectID();
const todos = [{
    _id:new ObjectID(),
    text:'First Test Text',
    _creator:user_one_id
},{
    _id:new ObjectID(),
    text:'Second Test Text',
     _creator:user_one_id
},{
    _id:new ObjectID(),
    text:'Third Test Text',
     _creator:user_one_id
}];
const users = [{
    _id:user_one_id,
    email:'test@gmail.com',
    password:'password',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:user_one_id,access:'auth'},SECRECT)
    }]
},
{
    _id:user_two_id,
    email:'test2@gmail.com',
    password:'password2'
}]




const populateTodos = (done) => {
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done())
      .catch((e)=>{
          console.log(e);
    });
}

const populateUsers = (done)=>{
     User.remove({}).then(()=>{
        // return User.insertMany(users);
        return Promise.all([new User(users[0]).save(),new User(users[1]).save()])
    }).then(()=>done())
    .catch((e)=>{
        console.log(e);
    });
}
module.exports = {
    populateTodos,
    populateUsers,
    todos,
    users
};
