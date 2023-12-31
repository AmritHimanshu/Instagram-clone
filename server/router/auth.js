const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is from auth of backend");
})

module.exports = router;