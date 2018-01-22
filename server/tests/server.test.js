const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//console.log(`This is the Todo:  ${Todo}`);

const todos = [{
    _id: new ObjectID(),
    text: 'Second test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {
 //   console.log('in beforeEach')
 //    Todo.remove({}).then(() => done());
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
});


describe('POST /todos', function() {
    it('should create a new todo', function(done)  {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect(function(res) {
                expect(res.body.text).toBe(text);
            })
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then(function(todos){
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
        });

    it('should not create a todo within invalid body data',  (done) => {
     request(app)
         .post('/todos')
         .send({})
         .expect(400)
         .end((err,res) => {
             if (err) {
                 return done(err);
             }
             Todo.find().then((todos) => {
                 expect(todos.length).toBe(2);
                 done();
            }).catch((e) => done(e));
        });
    });
});

describe('Get /todos', () => {
  it('should get all todos', (done) => {
      request(app)
          .get('/todos')
          .expect(200)
          .expect((res) => {
               expect(res.body.todos.length).toBe(2);
          })
          .end(done);
  });
});

describe('Get /todos/:id', () => {
   it('should return todo doc', (done) => {
       request(app)
           .get(`/todos/${todos[0]._id.toHexString()}`)
           .expect(200)
           .expect((res) => {
               expect(res.body.todo.text).toBe(todos[0].text);
           })
           .end(done);
   });

   it('should return 404 if todo not found', (done) => {
       request(app)
           .get(`/todos/(new ObjectID()).toHexString()`)
           .expect(404)
           .end(done);
   });

   it('should return 404 for object ids', (done) => {
       request(app)
           .get('/todos/123abc')
           .expect(404)
           .end(done);
   });
});

describe('DELETE /todos/:id', (done) => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
        });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 405 if ojbect id is invalid', (done) => {
        request(app)
            .delete('todos/123abc')
            .expect(405)
            .end(done);

     });
});