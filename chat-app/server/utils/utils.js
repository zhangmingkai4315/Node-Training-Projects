const moment = require('moment');
module.exports={
    generateMessage:function(from,text,to){
        // 如果使用=>的话，使用下面的参数取值将会遇到问题
        if(Array.prototype.slice.call(arguments).length<2){
            return false
        }
        return{
            from,
            text,
            to,
            createdAt:moment().valueOf()
        }
    },
    generateLocationMessage:function(from,location,to){
        // 如果使用=>的话，使用下面的参数取值将会遇到问题
        if(Array.prototype.slice.call(arguments).length<2){
            return false
        }
        return{
            from,
            location,
            to,
            url:`http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${location.lat},${location.lng}&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp`,
            createdAt:moment().valueOf()
        }
    },
    isRealString:(str)=>{
        return typeof str==='string' && str.trim().length >0;
    }
}