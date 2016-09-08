
function Check() {
    //function checkLogin(req, res, next) {
    //    if (!req.session.user) {
    //        req.flash('error', '未登入');
    //        return res.redirect('/login');
    //    }
    //    next();
    //}
    //function checkNotLogin(req, res, next) {
    //    if (req.session.user) {
    //        req.flash('error', '已登入');
    //        return res.redirect('/');
    //    }
    //    next();
    //}
}
module.exports = Check;

Check.checkLogin = function(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登入');
        return res.redirect('/login');
    }
    next();
}

Check.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登入');
        return res.redirect('/');
    }
    next();
}