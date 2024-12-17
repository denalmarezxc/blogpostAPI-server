const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    content: {
        type: String,
        required: [true, 'Content is Required']
    },
    author: {
        type: String,
        required: [true, 'Content is Required']
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Post', postSchema);