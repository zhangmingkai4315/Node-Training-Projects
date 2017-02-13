const supertest = require('supertest');
const expect = require('expect');
const app = require('./app').app;

describe('Basic express http test suit',()=>{
    it('Get / should return a simple world',(done)=>{
        supertest(app).get('/')
                      .expect('Content-Type','text/html; charset=utf-8')
                      .expect('Content-Length','5')
                      .expect(200)
                      .end(done);
    });
    it('Get /404 should return a 404 status',(done)=>{
        supertest(app).get('/404')
                      .expect(404)
                      .end(done);
    });
    it('Get /name should return a user object',(done)=>{
        supertest(app).get('/name')
                      .set('Accept', 'application/json')
                      .expect('Content-Type', /json/)
                      .expect((err,res)=>{
                          if(err){
                              throw err;
                          }else{
                              expect(res.body).toInclude({name:'Mike'});
                          }
                      })
                      .end(done);
    })
})