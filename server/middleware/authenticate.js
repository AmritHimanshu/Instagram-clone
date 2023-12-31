const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        // Check for token expiration
        if (!verifyToken) {
            throw new Error('Token has expired');
        }

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).send("Unauthorized: Token has expired");
        } else {
            res.status(401).send("Unauthorized: No valid token provided");
        }

        // Uncomment the line below for debugging purposes
        // console.log(error);
    }
}

module.exports = authenticate;
