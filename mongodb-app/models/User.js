const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');
const SECRET='secret_info';
// {
//     email:'abc@gmail.com',
//     password:hash('123'),
//     tokens:[{
//          access:'auth',
//          token:'adwadczdsda'
//          }
//      ]
// }
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return validator.isEmail(value);
            },
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

UserSchema.methods={
    generateAuthToken:function(){
        let user = this;
        let access = 'auth';
        let token = jwt.sign({
            access,
            _id:user._id.toHexString()
        },SECRET).toString();

        user.tokens.push({
            access,
            token
        });
        return user.save().then(()=>{
            return token
        });
    },
    removeToken:function(token){
        let user = this;
        return user.update({$pull:{
            tokens:{
                token:token
            }
        }});
    },
    toJSON:function(){
        let user = this;
        let userObject = user.toObject();
        return _.pick(userObject,['email','_id']);
    }
}

UserSchema.statics.findByToken=function(token){
    let User = this;
    // console.log(User);
    let decoded 
    try{
        decoded = jwt.verify(token,SECRET);
    }catch(e){
        // console.log(e)
        return Promise.reject();
    }
    return User.findOne({
        _id:decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
};

UserSchema.statics.findByCredentials=function(email,password){
    let User = this;
    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return new Promise((reslove,reject)=>{
            bcryptjs.compare(password,user.password,(err,res)=>{
                // console.log(res)
                if(res){
                    return reslove(user);
                }else{
                    return reject();
                }
            });
        });
    })
};
// mongoose　schema 
UserSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        bcryptjs.genSalt(10,(err,salt)=>{
            bcryptjs.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            });
        });
    }else{
        next()
    }
});
const User = mongoose.model('User',UserSchema);

module.exports = { User }