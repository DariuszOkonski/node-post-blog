const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    res.redirect('/posts');
});

router.get('/posts', (req, res) => {
    res.render('index');
})

module.exports = router;
