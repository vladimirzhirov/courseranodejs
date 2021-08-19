var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const {Dishes, dishSchema} = require('../models/dishes');
const {User, userSchema} = require('../models/user');

var favoriteSchema = new Schema({
    user:  {type: userSchema},
    dishes: [{type: dishSchema}]
});

var passportLocalMongoose = require('passport-local-mongoose');

favoriteSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Favorite', favoriteSchema);