var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// var user = new User({
//     email: 'test.com'
// });
//
// user.save().then((doc) => {
//     console.log('save dinner todo',doc);
// }, (err) => {
//     console.log('could not save User', err);
// });

module.exports = {User};