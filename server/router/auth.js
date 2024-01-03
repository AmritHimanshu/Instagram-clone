const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const authenticate = require('../middleware/authenticate');

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
        if (emailExist) {
            return res.status(422).json({ error: "Email id already registered" });
        }
        const usernameExist = await User.findOne({ username: username });
        if (usernameExist) {
            return res.status(422).json({ error: "Username is already registered" });
        }
        const user = new User({ email, username, name, phone, password, cpassword });
        const userRegister = await user.save();
        if (userRegister) {
            return res.status(201).json({ message: "User registered successfully" });
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

router.post('/uploadProfilePic', authenticate, upload.single('file'), async (req, res) => {
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
    const { editName, editUsername, editBio } = req.body;
    try {
        req.rootUser.name = editName;
        req.rootUser.username = editUsername;
        req.rootUser.bio = editBio;

        await req.rootUser.save();

        res.status(201).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/uploadPost', authenticate, upload.single('image'), async (req, res) => {
    try {
        const imageFile = req.file;
        const postImage = {
            data: imageFile.buffer,
            contentType:imageFile.mimetype,
        }
        const caption = req.body.caption;
        const username = req.rootUser.username;
        const userImage = req.rootUser.profilePicture;

        const post = new Post({ postImage, caption, username, userImage });
        const postUpload = await post.save();

        if (postUpload) {
            return res.status(201).json({ message: "Post uploaded successfully" });
        }
        else {
            return res.status(500).json({ error: "Post is not uploaded try after sometime" });
        }

        // // ---------- Saving Post in the user collection ----------

        // // First way for userSchema
        // const post = {
        //     image: {
        //         data: imageFile.buffer,
        //         contentType: imageFile.mimetype,
        //     },
        //     caption: caption,
        // };
        // const userPost = await req.rootUser.addPost(post);

        // // Second way for userSchema
        // req.rootUser.posts.push(post);
        // await req.rootUser.save();

        // res.status(201).send({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/getUserPost', authenticate, async (req, res) => {
    try {
        const userPost = await Post.find({ username: req.rootUser.username });
        res.status(200).send(userPost);
    } catch (error) {
        console.log("GetUserPost" + error);
    }
})

router.get('/getAllPost', async (req, res) => {
    // res.status(200).json({message:"hii this is get all post"})
    // try {
        const allPost = await Post.find();
        res.status(200).send(allPost);
    // } catch (error) {
    //     console.log("GetAllPost" + error);
    // }
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