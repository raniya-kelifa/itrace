var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
const expressValidator = require('express-validator')
var expressMessage = require('express-message');
var session =require('express-session');
var localStrategy = require('passport-local').Strategy;
var passport=require('passport');
var dotenv=require('dotenv').config()
var swaggerJsdoc =require('swagger-jsdoc');
var swaggerUi= require('swagger-ui-express')


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

const swaggerOptions ={
  swaggerDefinition :{
    info:{
      title:'Job posts_final exam',
      description:'job posting application'
    }
  },
  apis:['./routes/*.js']
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
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

