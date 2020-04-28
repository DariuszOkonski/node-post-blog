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
    const content = req.sanitize(req.body.post.content.trim());

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
});

router.get('/posts/:id/edit', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if(err) {
            console.log('ERROR ag get/posts/id/edit...');
            res.redirect('/');
        } else {
            res.render('edit', {
                post: foundPost
            });
        }
    });
});

router.put('/posts/:id', (req, res) => {
    const title = req.sanitize(req.body.post.title);
    const image = req.sanitize(req.body.post.image);
    const content = req.sanitize(req.body.post.content.trim());

    Post.findByIdAndUpdate(req.params.id, {title, image, content}, (err) => {
        if(err) {
            console.log('ERROR: put/posts/id...');
            res.redirect('/');
        } else {
            res.redirect(`/posts/${req.params.id}`);
        }
    })
});

router.delete('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log('ERROR: delete/posts/id...');
            res.redirect('/');
        } else {
            res.redirect('/posts');
        }
    })
})

module.exports = router;