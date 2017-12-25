// const MongoClient = require('mongodb').MongoClient;
// following is object destructing; same as code above
// ObjectID can be used to generate a mongo object ID
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
   if (err) {
      return console.log('Unable to connect to MongoDB server');
   }
   console.log('Connected to MongoDB server');


//    db.collection('Todos').insertOne({
//        text: 'Something to do',
//        completed: false
//    }, (err, result) => {
//        if (err) {
//            return console.log('Unable to insert todo', err);
//        }
//
//        console.log(JSON.stringify(result.ops, undefined, 4));
//     });

    // db.collection('Users').insertOne({
    //     name: 'James Jacobs',
    //     age: 74,
    //     location: 'Playa del Carmen'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });


   db.close();
});

