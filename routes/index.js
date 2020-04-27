const express = require('express');
const router = express.Router({mergeParams: true});
const Post = require('../model/post');

router.get('/', (req, res) => {
    res.redirect('/posts');
});

router.get('/posts', (req, res) => {
    Post.find({}, (err, foundPosts) => {
        if(err) {
            console.log('ERROR at get/post...');
        } else {
            res.render('index', {
                posts: foundPosts
            });
        }
    });
});

router.get('/posts/new', (req, res) => {
    res.render('new');
});

router.post('/posts', (req, res) => {

    res.send('This will be post page');
})

module.exports = router;