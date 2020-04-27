const express = require('express');
const router = express.Router({mergeParams: true});
const Post = require('../model/post');

router.get('/', (req, res) => {
    res.render('landing');
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
    const title = req.sanitize(req.body.post.title);
    const image = req.sanitize(req.body.post.image);
    const content = req.sanitize(req.body.post.content);

    Post.create({title, image, content}, (err) => {
        if(err) {
            console.log('ERROR: post/posts: ', err);
            res.redirect('/posts');
        } else {
            res.redirect('/posts');
        }
    });
})

module.exports = router;