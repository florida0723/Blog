var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        db: settings.db,
        host:settings.host,
        url: settings.url
    })
}));

var partials = require('express-partials');
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.post = req.session.post;
    res.locals.title = res.locals.title ? res.locals.title : 'Error';

    var error = req.flash('error');
    res.locals.error = error.length ? error : null;

    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});

//设置路由
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/reg', require('./routes/reg'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/post', require('./routes/post'));
app.use('/u', require('./routes/u'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(function (req, res, next) {
    res.locals.user = req.session.user ? req.session.user : null;

    var err = req.flash('error');
    var success = req.flash('success');

    res.locals.error = err.length ? err : null;
    res.locals.success = success.length ? success : null;

    next();
});

module.exports = app;

app.listen(3000);
console.log('listing port 3000');
