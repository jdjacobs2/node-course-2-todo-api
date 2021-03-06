// const MongoClient = require('mongodb').MongoClient;
// following is object destructing; same as code above
// ObjectID can be used to generate a mongo object ID
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server in find');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a40e32832b30fff42d34398')
    // }, {
    //     $set:{
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a404916a6a90c2b2600b68e')
    }, {
        $set:{
            name: 'Jean'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //db.close();
});
