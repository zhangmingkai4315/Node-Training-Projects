const request = require('request');
const GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const WEATHER_API_URL = 'https://api.darksky.net/forecast/7b2abff5220435981154df5e79a0a438/';
module.exports = {
    geoCodeAddress:(address,callback)=>{
        let _address = encodeURIComponent(address);
        request({
            url:`${GOOGLE_MAP_URL}${_address}`,
            json:true},
            (err,res,obj)=>{
            if(err){
                callback(new Error('Network Failure'),null)
                return;
            }else if(obj.status == 'ZERO_RESULTS'){
                callback(new Error('Your search term can not be located!'),null)
                return;
            }else if(obj.status == 'OK'){
                callback(null,{
                    Address:obj.results[0].formatted_address,
                    location:obj.results[0].geometry.location
                });
            }
        });
    }
}