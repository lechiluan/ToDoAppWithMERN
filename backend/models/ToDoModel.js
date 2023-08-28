const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    // user_id: {
    //     type: String,
    //     required: true
    // },

    // isCompleted: {
    //     type: Boolean,
    //     default: false
    // }
});

module.exports = mongoose.model('todo', todoSchema);