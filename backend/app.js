const dotenv = require('dotenv').config({ path: './.env' });
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const userRouter = require('./routes/user.routes');
const templateRouter = require('./routes/template.routes');

const mongoDB = require('./database/connection');

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// handles static routes and serves react frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// sets up api routes
app.use('/api/user', userRouter);
app.use('/api/template', templateRouter);

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
  res.render('error');
});

module.exports = app;
