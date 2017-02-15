const env = process.env.NODE_ENV||'development';
const envconfig = require('./config/envconfig.json');
const baseconfig = require('./config/base.json');
const envConfigObj = envconfig[env];

Object.keys(envConfigObj).forEach(key=>{
    process.env[key]=envConfigObj[key];
});

Object.keys(require('./config/base.json')).forEach(key=>{
    process.env[key]=baseconfig[key];
});

const config = {
    envconfig:envConfigObj,
    baseconfig
} 
module.exports=config;

