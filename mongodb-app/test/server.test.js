const expect = require('expect');
const request = require('supertest');
const mongoose = require('mongoose');

const {app} = require('../server');
const {User,Todo} = require('../models');
const connection = mongoose.connection;

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        done();
    });
});
describe('Post /todos' ,()=>{
    it('should return a new todo',(done)=>{
        let text = 'text todo'
        request(app).post('/todos')
                    .send({text})
                    .expect(200)
                    .end((err,res)=>{
                            expect(res.body.text).toBe(text);
                            Todo.find().then((todos)=>{
                            expect(todos.length).toBe(1);
                            expect(todos[0].text).toBe(text);
                            done();
                        });
                    
        });
    });
    it('should not create a new todo without valide data',(done)=>{
        let text = ''
        request(app).post('/todos')
                    .send({text})
                    .expect(400)
                    .end((err,res)=>{
                        Todo.find().then((todos)=>{
                        expect(todos.length).toBe(0);
                        done();
                    });
                  
        });
    });
});

describe('Get /todos' ,()=>{
    it('should return a empty todo',(done)=>{
        request(app).get('/todos')
                    .expect(200)
                    .end((err,res)=>{
                            expect(res.body.todos.length).toBe(0);
                            done();
                    });
                    
   });
  it('should return a new todo array with one todo item',(done)=>{
        let text = 'text todo'
        request(app).post('/todos')
                    .send({text})
                    .expect(200)
                    .end((err,res)=>{
                            expect(res.body.text).toBe(text);
                            Todo.find().then((todos)=>{
                            expect(todos.length).toBe(1);
                            expect(todos[0].text).toBe(text);
                            request(app).get('/todos')
                            .expect(200)
                            .end((err,res)=>{
                                    expect(res.body.todos.length).toBe(1);
                                    expect(res.body.todos[0].text).toBe(text);
                                    done();
                            });
                        });
                    
        });
    });

});


describe('Get /todo/:id' ,()=>{
    it('should return a new todo',(done)=>{
        let text = 'text todo'
        request(app).post('/todos')
                    .send({text})
                    .expect(200)
                    .end((err,res)=>{
                            expect(res.body.text).toBe(text);
                            Todo.find().then((todos)=>{
                            expect(todos.length).toBe(1);
                            expect(todos[0].text).toBe(text);
                            let id = todos[0]['_id'];
                            request(app).get(`/todo/${id}`)
                                .expect(200)
                                .end((err,res)=>{
                  
                                    expect(res.body.todo[0]['text']).toBe(text);
                                    done();
                                });
                            
                             });
                        });
                    
        });
});