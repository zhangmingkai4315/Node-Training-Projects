const expect = require('expect');
const {Users} = require('./users');
describe('Users Function Test',()=>{
    var users;  
    beforeEach(()=>{
        users = new Users();
        users.users = [{
                id:1,
                name:'mike',
                room:'nodejs'
            },{
                id:2,
                name:'alice',
                room:'react'
            },{
                id:3,
                name:'tom',
                room:'nodejs'
            },{
                id:4,
                name:'Jone',
                room:'nodejs'
            }]
    });
    it('addUser should add a users object',()=>{
            let u= {
                id:5,
                name:'Juli',
                room:'angulajs'
            }
            var result = users.addUser(u.id,u.name,u.room);
            expect(users.users.length).toBe(5);
            expect(result).toInclude(u);
    });

    it('getUsersList should return a users list',()=>{
            var result = users.getUsersList('nodejs');
            expect(result.length).toBe(3);
            expect(result).toEqual(['mike','tom','Jone']);
    });
    it('getUser should return a user',()=>{
            var result = users.getUser(1);
            expect(result.name).toBe('mike');
    });
    it('getUser should not return a user',()=>{
            var result = users.getUser(-1);
            expect(result).toBe(null);
    });
    it('removeUser should return a users list',()=>{
            expect(users.users.length).toBe(4);
            var result = users.removeUser(1);
            expect(result.id).toBe(1);
            expect(users.users.length).toBe(3);
    });
});