module.exports.add = (a,b)=>{
    if(typeof a ==='number'&&typeof b ==='number'){
        return a+b;
    }else{
        return null;
    }
}

module.exports.square = (a)=>{
    if(typeof a ==='number'){
        return a*a;
    }else{
        return null;
    }
}

module.exports.set_name = (user,fullname)=>{
    if(typeof user ==='object' && typeof fullname ==='string'){
        let names = fullname.split(' ')
        if(names.length>1){
            user.firstName = names[0];
            user.lastName = names[1];
        }else{
            user.firstName = fullname
        }
        return user;
    }else{
        return null;
    }
}


module.exports.asyncAdd = (a,b,callback)=>{
    setTimeout(()=>{
        if(typeof a ==='number'&&typeof b ==='number'){
            callback(null,a+b);
        }else{
            callback(new Error("Type Error"),null);
        }
    },1000);
}