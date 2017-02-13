// const db = require('./db');
module.exports.handleSignUp = (email,password) =>{
    // Check email is exist already.

    // Save the user 
    console.log('Start Save User')
    db.saveUser({
        email,
        password
    });
    
    // Send Welcome email 
}