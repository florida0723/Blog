var express = require('express');
var router = express.Router();
var Check = require('./check.js')

router.get('/', Check.checkLogin);
router.get('/', function (req, res, next) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
});

module.exports = router;
