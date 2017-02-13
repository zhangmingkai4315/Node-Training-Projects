const utils = require('./utils');
var assert = require('assert');

const expect = require('expect');
describe('Utils Test', () =>{
    describe('Utils Sync Functions Test-1', () =>{
        it('Add function should add two numbers',()=>{
            let result = utils.add(3,4);
            assert.equal(result,7);
        });
        it('Add function should return null when input not numbers',()=>{
            let result = utils.add(3,'4');
            assert.equal(result,null);
            let result2 = utils.add(3,'hello');
            assert.equal(result2,null);
        });

        it('Square function should return normal when input is numbers',()=>{
            let result = utils.square(3);
            assert.equal(result,9);
        });
        // or using error throw
        it('Square function should return null when input not numbers',()=>{
            let result = utils.square('hello');
            if(result!==null){
                throw new Error(`Expected null, but got ${result}`)
            }
        });
    });

    //   Utils Functions Test-1
    //     ✓ Add function should add two numbers
    //     ✓ Add function should return null when input not numbers
    //     ✓ Square function should return normal when input is numbers
    //     ✓ Square function should return null when input not numbers


    describe('Utils Sync Functions Test-2', () =>{
        it('Add function should add two numbers',()=>{
            let result = utils.add(3,4);
            expect(result).toBe(7);
        });
        it('Add function should return null when input not numbers',()=>{
            let result = utils.add(3,'4');
            expect(result).toNotExist();
            let result2 = utils.add(3,'hello');
            expect(result2).toNotExist();
        });

        it('Square function should return normal when input is numbers',()=>{
            let result = utils.square(3);

        expect(result).toBe(9);
        });
        // or using error throw
        it('Square function should return null when input not numbers',()=>{
            let result = utils.square('hello');
            expect(result).toNotExist();
        });

        it('should add firstName and lastName to user object',()=>{
            let user = {
                name:'mike'
            };
            user = utils.set_name(user,'Mike Zhang');
            expect(user).toInclude({'firstName':"Mike"});
            expect(user).toInclude({'lastName':"Zhang"});
            expect(user).toInclude({'name':"mike"});
            let user2 = {
                age:20
            };
            user2 = utils.set_name(user2,'Mike');
            expect(user2).toInclude({'firstName':"Mike"});
            expect(user2).toNotIncludeKey('lastName')
            expect(user2).toInclude({'age':20});
        });
    });
    //   Utils Functions Test-2
    //     ✓ Add function should add two numbers
    //     ✓ Add function should return null when input not numbers
    //     ✓ Square function should return normal when input is numbers
    //     ✓ Square function should return null when input not numbers
    //     ✓ should add firstName and lastName to user object

    describe('Utils Async Functions Test', () =>{
        it('should return result in 1 second',(done)=>{
            utils.asyncAdd(1,2,(err,data)=>{
                expect(data).toBe(3).toBeA('number');
                done()
            });
        });
    });
    //   Utils Async Functions Test
        // ✓ should return result in 1 second (1003ms)
});