module.exports.add=(...args)=>{
    console.log(`The length is ${args.length}`)
    return args.reduce((a,sum)=>{return sum+a;});
}
module.exports.multi=(...args)=>{
    console.log(`The length is ${args.length}`)
    return args.reduce((a,number)=>{return number*a;});
}