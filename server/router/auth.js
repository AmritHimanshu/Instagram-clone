const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const User = require('../model/userSchema');
const Post = require('../model/postSchema');


router.post('/register', async (req, res) => {
    const { email, username, name, phone, password, cpassword } = req.body;
    if (!email || !username || !name || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the fields" });
    }
    if (password !== cpassword) return res.status(422).json({ error: "Password and Confirm Password not matched" });

    try {
        const emailExist = await User.findOne({ email: email });
        const usernameExist = await User.findOne({ username: username });
        if (emailExist) {
            return res.status(422).json({ error: "Email id already registered" });
        }
        else if (usernameExist) {
            return res.status(422).json({ error: "Username is already registered" });
        }
        else {
            const user = new User({ email, username, name, phone, password, cpassword });
            const userRegister = await user.save();
            if (userRegister) {
                return res.status(201).json({ message: "User registered successfully" });
            }
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { return res.status(422).json({ error: "Fill all the fields" }); }

    try {
        const emailLogin = await User.findOne({ email: email });
        const usernameLogin = await User.findOne({ username: email });
        const phoneLogin = await User.findOne({ phone: email });

        if (emailLogin) {
            const isMatch = await bcrypt.compare(password, emailLogin.password);

            const Token = await emailLogin.generateAuthToken();

            res.cookie("jwtoken", Token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                secure: true,  // Mark as secure if using HTTPS
                sameSite: 'None',  // Set SameSite attribute for cross-origin requests
                path: '/',
            });

            if (isMatch) {
                res.status(200).json(emailLogin);
            }
            else {
                res.status(400).json({ error: "Invalid Credentials" });
            }
        }
        else if (usernameLogin) {
            const isMatch = await bcrypt.compare(password, usernameLogin.password);

            const Token = await usernameLogin.generateAuthToken();

            res.cookie("jwtoken", Token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                secure: true,  // Mark as secure if using HTTPS
                sameSite: 'None',  // Set SameSite attribute for cross-origin requests
                path: '/',
            });

            if (isMatch) {
                res.status(200).json(usernameLogin);
            }
            else {
                res.status(400).json({ error: "Invalid Credentials" });
            }
        }
        else if (phoneLogin) {
            const isMatch = await bcrypt.compare(password, phoneLogin.password);

            const Token = await phoneLogin.generateAuthToken();

            res.cookie("jwtoken", Token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                secure: true,  // Mark as secure if using HTTPS
                sameSite: 'None',  // Set SameSite attribute for cross-origin requests
                path: '/',
            });

            if (isMatch) {
                res.status(200).json(phoneLogin);
            }
            else {
                res.status(400).json({ error: "Invalid Credentials" });
            }
        }
        else res.status(400).json({ error: "Invalid Credentials" });
    } catch (error) {
        console.log(error);
    }
})

router.post('/uploadProfilePic', authenticate, async (req, res) => {
    try {
        req.rootUser.profilePicture = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };

        // Save the updated user document
        await req.rootUser.save();

        res.status(201).send({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/saveProfile', authenticate, async (req, res) => {
    const { editName, editUsername, editBio, pic } = req.body;
    try {
        req.rootUser.name = editName;
        req.rootUser.username = editUsername;
        req.rootUser.bio = editBio;
        req.rootUser.profilePic = pic;

        await req.rootUser.save();

        res.status(201).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/uploadPost', authenticate, async (req, res) => {
    try {
        const { caption, pic } = req.body;
        if (!pic) {
            return res.status(422).json({ error: "Please select photo to upload" });
        }

        const post = new Post({
            caption,
            photo: pic,
            postedBy: req.rootUser
        });

        const postUpload = await post.save();

        if (postUpload) {
            return res.status(201).json({ message: "Post uploaded successfully" });
        }
        else {
            return res.status(500).json({ error: "Post is not uploaded, try after sometime" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/getUserPost', authenticate, async (req, res) => {
    try {
        const userPost = await Post.find({ postedBy: req.userID });
        res.status(200).send(userPost);
    } catch (error) {
        console.log("GetUserPost" + error);
    }
})

router.get('/getAllPost', authenticate, async (req, res) => {
    try {
        const allPost = await Post.find().populate("postedBy", "_id username profilePic").populate("comments.postedBy","_id username");
        res.status(200).send(allPost);
    } catch (error) {
        console.log("GetAllPost" + error);
        res.status(500).send({ error: error })
    }
})

// Put is used when we update the data in the schema
router.put('/like', authenticate, async (req, res) => {
    try {
        const like = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.userID }
        }, {
            new: true
        }).populate("postedBy", "_id username profilePic");
        if (like) {
            return res.status(201).json(like);
        }
    } catch (error) {
        return res.status(422).json({ error: error });
    }
})

router.put('/unlike', authenticate, async (req, res) => {
    try {
        const unlike = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.userID }
        }, {
            new: true
        }).populate("postedBy", "_id username profilePic");
        if (unlike) {
            return res.status(201).json(unlike);
        }
    } catch (error) {
        return res.status(422).json({ error: error });
    }
})

router.put('/comment', authenticate, async (req, res) => {
    try {
        const { yourComment, postId } = req.body;
        const comment = {
            comment: yourComment,
            postedBy: req.rootUser
        };
        const addedComment = await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment }
        }, {
            new: true
        }).populate("postedBy", "_id username profilePic").populate("comments.postedBy", "_id username");
        if (addedComment) {
            return res.status(201).json(addedComment);
        }
    } catch (error) {
        return res.status(422).json({ error: error });
    }
})

router.get('/getData', authenticate, (req, res) => {
    res.status(200).send(req.rootUser);
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: 'User Logout' });
})

router.get('/', (req, res) => {
    res.send("This is from auth of backend");
})

module.exports = router;