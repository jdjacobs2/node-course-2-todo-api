const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//console.log(`This is the Todo:  ${Todo}`);

const todos = [{
    text: 'Second test todo'
}, {
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
