const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    posts: [
        {
            image: {
                data: Buffer,
                contentType: String
            },
            caption: {
                type: String,
                required: true,
            }
        }
    ],
    
})