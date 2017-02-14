const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');

const {User,Todo} = require('../models');
const {todos,users,populateTodos,populateUsers} = require('./seed');

beforeEach(populateTodos);
beforeEach(populateUsers);
describe('Post /todos' ,()=>{
    it('should return a new todo',(done)=>{
        let text = 'new text todo'
        request(app).post('/todos')
                    .send({text})
                    .expect(200)
                    .end((err,res)=>{
                            expect(res.body.text).toBe(text);
                            Todo.find().then((todos)=>{
                            expect(todos.length).toBe(4);
                            expect(todos[3].text).toBe(text);
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
                        expect(todos.length).toBe(3);
                        done();
                    });
                  
        });
    });
});

describe('Get /todos' ,()=>{
    it('should return a todo list',(done)=>{
        request(app).get('/todos')
                    .expect(200)
                    .end((err,res)=>{
                            expect(res.body.todos.length).toBe(3);
                            done();
                    });
                    
   });
  it('should return a new todo array with some todo item',(done)=>{
        let text = 'text todo'
        request(app).post('/todos')
                    .send({text})
                    .expect(200)
                    .end((err,res)=>{
                            expect(res.body.text).toBe(text);
                            Todo.find().then((todos)=>{
                            expect(todos.length).toBe(4);
                            request(app).get('/todos')
                            .expect(200)
                            .end((err,res)=>{
                                    expect(res.body.todos.length).toBe(4);
                                    done();
                            });
                        });
        });
    });

});


describe('Get /todos/:id' ,()=>{
    it('should return a new todo',(done)=>{
        let todo = todos[0]
        request(app).get(`/todos/${todo._id.toHexString()}`)
            .expect(200)
            .end((err,res)=>{
                expect(res.body.todo[0]['text']).toBe(todo.text);
                done();
            });    
    });
                    
});

describe('Delete /todo/:id' ,()=>{
    it('should delete a new todo',(done)=>{
        let todo = todos[0]
        request(app).delete(`/todos/${todo._id.toHexString()}`)
            .expect(200)
            .end((err,res)=>{
                    expect(res.body.success).toBe(true);
                    done();
        });                 
    });
     it('should delete nothing',(done)=>{
         let id = '58a2a652174d5b761ab053cf';
         request(app).delete(`/todos/${id}`)
                                .expect(404)
                                .end((err,res)=>{
                                    // expect(res.body).toBe(null);
                                    expect(res.body.error).toBe('NotFound');
                                    done();
        });
     })
});

describe('Patch /todo/:id' ,()=>{
    it('should update a todo',(done)=>{
    let todo = todos[0]
    request(app).patch(`/todos/${todo._id.toHexString()}`)
        .send({completed:true})
        .expect(200)
        .end((err,res)=>{
            expect(res.body.success).toBe(true);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo).toIncludeKey('completedAt');
            done();
        });
    });
});

describe('Get /users/me',()=>{
    it('should return user if authenticated',(done)=>{
        request(app).get('/users/me')
                    .set('x-auth',users[0].tokens[0].token)
                    .expect(200)
                    .expect((res)=>{
                        expect(res.body._id).toBe(users[0]._id.toHexString());
                        expect(res.body.email).toBe(users[0].email);
         })
         .end(done)
    });
    it('should return 401 if not authenticated',(done)=>{
         request(app).get('/users/me')
                    // .set('x-auth',users[0].tokens[0].token)
                    .expect(401)
                    .expect((res)=>{
                        expect(res.body).toIncludeKey('error');
         })
         .end(done)
    })
});


describe('Post /users',()=>{
    it('should return user if post data is valide',(done)=>{
        let password = '1234567';
        let email = 'testwww@gmail.com'
        request(app).post('/users')
                    .send({
                        email,
                        password
                    })
                    .expect(200)
                    .expect((res)=>{
                        expect(res.headers['x-auth']).toExist();
                        expect(res.body.email).toBe(email);
         })
         .end(done)
    });
    it('should not return user if user is already exist',(done)=>{
        request(app).post('/users')
                    .send(users[1])
                    .expect(400)
                    .expect((res)=>{
                        expect(res.headers['x-auth']).toNotExist();
         })
         .end(done)
    });
});

describe('Post /login',()=>{
    it('should return user if post data is valide',(done)=>{
        // let {email,password} = users[0];
        request(app).post('/login')
                    .send({email:users[1].email,password:users[1].password})
                    .expect(200)
                    .expect((res)=>{
                        expect(res.headers['x-auth']).toExist();
                        expect(res.body.email).toBe(users[1].email);
         })
         .end(done)
    });
    it('should reject user if post data is not valide',(done)=>{
        // let {email,password} = users[0];
        request(app).post('/login')
                    .send({email:users[1].email,password:'not_correct_password'})
                    .expect(401)
                    .expect((res)=>{
                        expect(res.headers['x-auth']).toNotExist();
         })
         .end(done)
    });
});

describe('Delete /users/me/token',()=>{
    it('should remove auth token if post data is valide',(done)=>{
        // let user = users[0];
        request(app).delete('/users/me/token')
                    .set('x-auth',users[0].tokens[0].token)
                    .expect(200)
                    .end((err,res)=>{
                        if(err){
                            return done(err);
                        }
                        expect(res.headers['x-auth']).toNotExist();
                        User.findById(users[0]._id).then((user)=>{
                            expect(user.tokens.length).toBe(0);
                            done()
                        }).catch(e=>{
                            done(e);
                        })
        });
    });
});