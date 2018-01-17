var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});


// var newTodo = new Todo({
//     text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//     console.log('Save todo', doc);
// }, (err) => {
//     console.log('Unable to save todo');
// });

// var newTodo = new Todo({
//     text: 'Eat Dinner',
//     completed: true,
//     completedAt: 22
// });
//
// newTodo.save().then((doc) => {
//     console.log('save dinner todo', doc);
// }, (err) => {
//     console.log('could not save todo dinner ', err);
// });

module.exports = {Todo};