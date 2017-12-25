// const MongoClient = require('mongodb').MongoClient;
// following is object destructing; same as code above
// ObjectID can be used to generate a mongo object ID
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server in find');

    // db.collection('Todos').find({
    //     //the following two lines are possible find arg
    //     // completed: false
    //     _id: new ObjectID("5a3fd8e41cc61c027bf6ccd0")
    //     }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });


    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: "James Jacobs"}).toArray().then ((users => {
        console.log(JSON.stringify(users, undefined, 2));
    }), (err) => {
        console.log('Unable to fetch Users', err);
    });

    //db.close();
});
