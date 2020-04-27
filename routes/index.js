const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    res.send('I am working from routes folder...');
});

module.exports = router;
