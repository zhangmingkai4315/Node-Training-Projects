// 获得用户的输入参数
// 我们可以使用 process.argv来自己解释输入参数，或者我们引入一个外部的第三方库“yargs”

// console.log(process.argv);

// $ node basic/commands.js --help -i -d 4 
// [ '/usr/local/bin/node',
//   '/Volumes/MacintoshHD/github/Node-Training-Projects/basic/commands.js',
//   '--help',
//   '-i',
//   '-d',
//   '4' ]

const argv = require('yargs').argv;
const fs = require('fs');
// console.log(argv)
// { _: [], help: true, i: true, d: 4, '$0': 'basic/commands.js' }

let obj = {
    name:argv.name,
    body:argv.body
};
let stringObj = JSON.stringify(obj);
switch(argv.type){
    case 'json':
    console.log(obj);
    fs.writeFile(`${argv.name}.json`,JSON.stringify(obj, null, 2),(err)=>{
        if(err){
            console.log('save error')
        }
        console.log('save success')
    });
    break;
    default:
    console.log(stringObj);
    fs.writeFile(`${argv.name}.txt`,stringObj,(err)=>{
        if(err){
            console.log('save error')
        }
        console.log('save success')
    });
    // save to txt file
}

// zhangmingkaideMacBook-Pro:Node-Training-Projects zhangmingkai$ node basic/commands.js --name mike
// {"name":"mike"}
// zhangmingkaideMacBook-Pro:Node-Training-Projects zhangmingkai$ node basic/commands.js --type json --name mike
// { name: 'mike' }


// $ node basic/commands.js --type json --name mike --body="nodejs is awesome"
// { name: 'mike', body: 'nodejs is awesome' }
// save success

// {
//   "name": "mike",
//   "body": "nodejs is awesome"
// }