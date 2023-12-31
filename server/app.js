const express = require('express');
const app = express();

app.use(express.json());

app.use(require('./router/auth'));

app.listen(5000, () => {
    console.log(`Server is running at port ${5000}`);
})