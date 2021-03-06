var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/danhngon');
var routes = require("./routes");
//cac nhom dinh tuyen
/*
var index = require('./routes/index');
var users = require('./routes/users');
var templates = require('./routes/templates');
var bootstrap4 = require('./routes/bootstrap4');
var pro = require('./routes/pro');
*/
var app = express();
require('./config/passport')(passport);
var commonsMiddleware = require("./middleware/commons");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/khongdau', express.static(path.join(__dirname, 'node_modules', 'khong-dau', 'lib')));
app.use('/holder', express.static(path.join(__dirname, 'node_modules', 'holderjs')));
app.use('/isotope-layout', express.static(path.join(__dirname, 'node_modules', 'isotope-layout','dist')));
app.use('/javascripts', express.static(path.join(__dirname, 'public', 'javascripts')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public', 'stylesheets')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	resave: false,
   	saveUninitialized: false,
	secret:'kaizen life', 
	cookie:{},
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(path.join(__dirname, 'public')));

//app.use(cookieParser());
require('./config/app_settings')(app);
app.use(commonsMiddleware);
/*
//su dung cac nhom dinh tuyen
app.use('/', index);
app.use('/users', users);
app.use('/templates', templates);
app.use('/bootstrap4', bootstrap4);
app.use('/pro', pro);
*/
routes(app,passport);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
