const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
});

const movieSchema = new mongoose.Schema({
 
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    director: {
        type: String,
        required: [true, 'Director is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    description: {
        type: String,
        required: [true, 'Duration is required']
    },
    genre: {
        type: String,
        required: [true, 'Duration is required']
    },
    comments: [ commentSchema ],
});

module.exports = mongoose.model('Movie', movieSchema);