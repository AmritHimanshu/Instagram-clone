const express = require('express');
const router = express.Router();

const User = require('../model/userSchema');

router.post('/register', async (req, res) => {
    const { email, username, phone, password, cpassword } = req.body;
    if (!email || !username || !phone || !password || !cpassword) {
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
        const user = new User({ email, username, phone, password, cpassword });
        const userRegister = await user.save();
        if (userRegister) {
            return res.status(201).json({ message: "User registered successfully" });
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/', (req, res) => {
    res.send("This is from auth of backend");
})

module.exports = router;