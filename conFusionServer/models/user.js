var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    facebookId: String,
    admin:   {
        type: Boolean,
        default: false
    }
});

var passportLocalMongoose = require('passport-local-mongoose');

userSchema.plugin(passportLocalMongoose);

module.exports = {User: mongoose.model('User', userSchema), userSchema};
