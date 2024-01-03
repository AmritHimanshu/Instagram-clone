const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // postImage: {
    //     data: Buffer,
    //     contentType: String
    // },
    caption: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    // userImage: {
    //     data: Buffer,
    //     contentType: String
    // }
});

const Post = mongoose.model('POST', postSchema);

module.exports = Post;