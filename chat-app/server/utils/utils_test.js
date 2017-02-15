const expect = require('expect');
const utils = require('./utils');
describe('Utils Function Test',()=>{
    describe('generateMessage function test',()=>{
        it('should return a message object',()=>{
            let obj = utils.generateMessage('mike','hello')
            expect(obj).toBeA('object');
            expect(obj).toIncludeKey('createdAt');
            expect(obj).toInclude({
                text:'hello',
                from:'mike'
            });
            expect(obj.createdAt).toBeA('number');

            let obj2 = utils.generateMessage('mike','hello','alice')
            expect(obj2).toBeA('object');
            expect(obj2).toIncludeKey('createdAt');
            expect(obj2).toInclude({
                text:'hello',
                from:'mike',
                to:'alice'
            });
            expect(obj2.createdAt).toBeA('number');
        });
        it('should not return a message object without invalid arguments',()=>{
            let obj = utils.generateMessage('mike')
            expect(obj).toBe(false);
            // expect(obj).toNotIncludeKey('createdAt');
        });
    })

})