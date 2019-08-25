const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String, // Nome do arquivo gerado com o hash
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Post', PostSchema);
