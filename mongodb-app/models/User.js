const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
    toJSON:function(){
        let user = this;
        let userObject = user.toObject();
        return _.pick(userObject,['email','_id']);
    }
}
const User = mongoose.model('User',UserSchema);

module.exports = { User }