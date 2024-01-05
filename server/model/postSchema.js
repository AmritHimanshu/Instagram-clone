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
    likes: [
        {
            type: ObjectId,
            ref: "USER"
        }
    ],
    comments: [
        {
            comment: {
                type: String
            },
            postedBy: {
                type: ObjectId,
                ref: "USER"
            }
        }
    ],
    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
});

const Post = mongoose.model('POST', postSchema);

module.exports = Post;