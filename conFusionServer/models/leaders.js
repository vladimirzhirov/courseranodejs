const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    designation: {
      type: String,
      required: true
    },
    image: {
        type: String,
        required: true
    },
    abr: {
        type: String,
        default: 'SEO'
    },
    featured: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});


var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;