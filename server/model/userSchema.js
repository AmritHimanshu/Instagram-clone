const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = mongoose.Schema.Types;

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
    profilePic: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png'
    },
    bio: {
        type: String,
        default: true,
    },
    followers: [
        {
            follower: {
                type: ObjectId,
                ref: "USER"
            }
        }
    ],
    followings: [
        {
            following: {
                type: ObjectId,
                ref: "USER"
            }
        }
    ]
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

const User = mongoose.model('USER', userSchema);

module.exports = User;