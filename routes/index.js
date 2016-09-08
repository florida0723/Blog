var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');

router.get('/', function (req, res, next) {

    //获取所有发布信息。
    Post.get(null, function (err, posts) {
        if (err) {
            posts = [];
        }
        res.render('index', {
            title: '首页',
            posts: posts,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
});

module.exports = router;
