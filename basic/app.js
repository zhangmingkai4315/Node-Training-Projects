const fs = require('fs');
const os = require('os');
const Cal = require('./my_module');
const Math = require('./my_other_module');
let user = os.userInfo();
fs.appendFile('test.txt',`${user.username} say : Hello\n`,(err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log('Module Import Test Done');
});

console.log(Cal(10,20,30));
console.log(Math.add(10,20,30));
console.log(Math.multi(10,20,30));