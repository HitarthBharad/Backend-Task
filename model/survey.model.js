const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var Survey = new Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
        type: String,
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Survey', Survey)