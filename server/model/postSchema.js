const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    postedBy: {
        type: ObjectId,
    }
});

const Post = mongoose.model('POST', postSchema);

module.exports = Post;