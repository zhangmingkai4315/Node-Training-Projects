const googleMapApi = require('./lib/geocode');
const weatherApi = require('./lib/weatherlib');
const argv = require('yargs')
              .options({
                  a:{
                      describe:'Address to fetch weather.',
                      string:true,
                      demand:true,
                      alias:'address'
                  }
              })
              .help()
              .alias('help','h')
              .argv;
    


// request(`${GOOGLE_MAP_URL}beijing`,(err,res,body)=>{
//     if(err){
//         console.log('ERROR');
//         return
//     }
//     console.log(body);
// });
// {
//    "results" : [
//       {
//          "address_components" : [
//             {
//                "long_name" : "Beijing",
//                "short_name" : "Beijing",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Beijing",
//                "short_name" : "Beijing",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "China",
//                "short_name" : "CN",
//                "types" : [ "country", "political" ]
//             }
//          ],
//          "formatted_address" : "Beijing, China",
//          "geometry" : {
//             "bounds" : {
//                "northeast" : {
//                   "lat" : 41.0608159,
//                   "lng" : 117.514625
//                },
//                "southwest" : {
//                   "lat" : 39.4427581,
//                   "lng" : 115.4234116
//                }
//             },
//             "location" : {
//                "lat" : 39.904211,
//                "lng" : 116.407395
//             },
//             "location_type" : "APPROXIMATE",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 40.2164962,
//                   "lng" : 116.7829835
//                },
//                "northeast" : {
//                   "lat" : 40.2164962,
//                   "lng" : 116.7829835
//                },
//                "southwest" : {
//                   "lat" : 39.6612714,
//                   "lng" : 116.0119343
//                }
//             }
//          },
//          "place_id" : "ChIJuSwU55ZS8DURiqkPryBWYrk",
//          "types" : [ "locality", "political" ]
//       }
//    ],
//    "status" : "OK"
// }

googleMapApi.geoCodeAddress(argv.address,(err,obj)=>{
    if(err){
        console.log(err);
    }else{
        console.log(obj);
        weatherApi.getWeatherFromLocation(obj.location,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log(data);
            }
        });
    }
});

// bash-3.2$ node weatherApp/app.js -a beijing
// Address : Beijing, China
// Lat:39.904211,Lng:116.407395
// bash-3.2$ node weatherApp/app.js -a xiamen
// Address : Xiamen, Fujian, China
// Lat:24.479834,Lng:118.089425