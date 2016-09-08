var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:user', function (req, res, next) {
    res.send('user: ' + req.params.user);
});

module.exports = router;
