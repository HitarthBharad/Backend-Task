const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Result = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    },
    answers: [{
        type: Boolean
    }]
})

module.exports = mongoose.model('Result', Result)
