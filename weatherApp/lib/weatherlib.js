const request = require('request');
const WEATHER_API_URL = 'https://api.darksky.net/forecast/7b2abff5220435981154df5e79a0a438/';
module.exports = {
    getWeatherFromLocation:(location,callback)=>{
        if(location&&location.lat&&location.lng){
            request({
            url:`${WEATHER_API_URL}${location.lat},${location.lng}`,
            json:true},
            (err,res,obj)=>{
                if(err){
                    callback(new Error('Network Failure'),null)
                    return;
                }else if(obj.error||(res.statusCode!==200)){
                    callback(new Error('NotFound'),null);
                    return;
                }else if(obj.currently){
                    callback(null,obj.currently);
                }
            });
        }
    }
}