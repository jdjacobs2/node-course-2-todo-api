const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then(result) => {
//         console.log(result);
// }

Todo.findOneAndRemove({_id: '5a63627944f1ff274d99ff36'}).then(todo) => {

};

Todo.findOneAndRemove('5a63627944f1ff274d99ff36').then((todo) => {
    console.log(todo);
});