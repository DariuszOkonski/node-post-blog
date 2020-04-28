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
            res.redirect('/');
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
            res.redirect('/');
        } else {
            res.redirect('/posts');
        }
    });
});

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if(err) {
            console.log('ERROR at get/posts/id...');
            res.redirect('/');
        } else {
            res.render('show', {
                post: foundPost
            });
        }
    });
})

module.exports = router;