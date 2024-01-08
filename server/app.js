const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');


dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

require('./db/conn');

app.use(cors({
    origin:true,
    // origin:"https://instagram-clone-six-pi.vercel.app",
    credentials: true,  // Enable credentials (cookies)
}));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Credentials', true);
//     // ...
//     next();
// });

app.use(express.json());

app.use(require('./router/auth'));

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})