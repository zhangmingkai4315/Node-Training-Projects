const _ =require('lodash');

function add(a,b){
    return a+b;
}

console.log(`The add object is ${_.isFunction(add)?'function':'not function'}!`);

// $ node basic/third_lib_import.js 
// The add object is function!

// 使用nodemon工具启动后，任何新增的程序代码将会立即执行
console.log("Mike is running...")