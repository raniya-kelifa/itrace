var createError = require('http-errors');
var express = require('express');
var path = require('path');
const ejsLint = require('ejs-lint');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
const expressValidator = require('express-validator')
var expressMessage = require('express-message');
var session =require('express-session');
var localStrategy = require('passport-local').Strategy;
var passport=require('passport');
var flash = require('connect-flash')
var dotenv=require('dotenv').config()


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
// //Google authentication
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
// passport.use(new GoogleStrategy({
//     consumerKey:  process.env.consumerKey,
//     consumerSecret: process.env.consumerSecret,
//     callbackURL: "localhost:4242/auth/google/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//   }
// ));
// //facebook authentication
// var passport = require('passport')
// var FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//     consumerKey: process.env['FACEBOOK_CLIENT_ID'],
//     clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
//     callbackURL: "localhost:4242/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ facebook_id: profile.id }, function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ))

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages =(req, res);
  next();
});

app.use( expressValidator ({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

   while(namespace.length) {
    formParam += '[' + namespace.shift() + ']';
   }
   return {
    param : formParam,
    msg   : msg,
    value : value
   };
  }
 }));

app.use('/', indexRouter);
app.use('/', authRouter);

app.use(session({

  secret: 'secret',
    key: 'sid',
    saveUninitialized: true,
    resave: true

}))



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: true,
    message: err.message || 'Internal Error'
  });
});

module.exports = app;

