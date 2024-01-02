const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
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
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    bio: {
        type: String,
        default: true,
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// Generating Token
userSchema.methods.generateAuthToken = async function () {
    try {
        let Token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: Token });
        await this.save();
        return Token;
    } catch (error) {
        console.log(error);
    }
}

// Saving posts by the user
userSchema.methods.addPost = async function (post) {
    try {
        this.posts = this.posts.concat(post);
        await this.save();
        return this.posts;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;