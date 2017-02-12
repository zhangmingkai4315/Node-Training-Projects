const asyncAdd = (a,b)=>{
    return new Promise((resolve,reject)=>{
        if(typeof a==='number' && typeof b=== 'number'){
            resolve(`Your result is ${a+b}`);
        }else{
            reject('Your input arguments is not correct');
        }
    });
};

asyncAdd(10,20).then((data)=>{
    console.log(data);
},(err)=>{
    console.log(err);
})


const somePromise = new Promise((resolve,reject)=>{
    setTimeout(function() {
    //   resolve('Hey, it works');
    //   reject('reject');
        try{
            throw new Error('Error Message');
        }catch(err){
            reject(err)
        }
    }, 2000);
});

somePromise.then((data)=>{
    console.log('Success:',data);
},(rejectdata)=>{
    throw new Error('e');
    console.log('Failure:');
}).catch((err)=>{
    console.log('Error')
});

