const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;

require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})