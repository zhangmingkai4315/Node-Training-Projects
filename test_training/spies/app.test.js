const expect = require('expect');
const rewire = require('rewire');
const app = rewire('./app');
let db = {}
describe('App', () => {

    before(()=>{
        db = {
            saveUser: expect.createSpy()
        };
        app.__set__('db', db);
    });
    it('Should call the spy correctly', () => {
        let spy = expect.createSpy();
        spy('Mike', 20);
        expect(spy).toHaveBeenCalledWith('Mike', 20);
    });
    it('Should call saveUser correctly', () => {
        let email = 'abc@123.com',
            password = 'abc123';
        app.handleSignUp(email, password);
        // expect(db.saveUser).toNotHaveBeenCalled()
        expect(db.saveUser).toHaveBeenCalledWith({email,password});
    })
});