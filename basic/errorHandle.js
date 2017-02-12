const fs = require('fs');

try{
    let not_exist_data = fs.readFileSync('not_exist_file');
    console.log(not_exist_data);
}catch(e){
    if(e.code=='ENOENT'){
         console.log('No Such File');
    }
}