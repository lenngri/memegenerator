const dotenv = require('dotenv').config({ path: './.env' });
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser', );
const logger = require('morgan');
const cors = require('cors')

const userRouter = require('./routes/user.routes');
const templateRouter = require('./routes/template.routes');
const memeRouter = require('./routes/meme.routes');
const privateRouter = require('./routes/private.routes');

const mongoDB = require('./database/connection');

const app = express();

// allow all cross-origin requests
app.use(cors());

// view engine setup
app.set('view engine', 'pug');

<<<<<<< HEAD
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
=======
app.use(bodyParser.json())
>>>>>>> bf4fcaac4f492bca18a33e4ce2a415f82a2eace5
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// handles static routes and serves react frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// sets up api routes
app.use('/api/user', userRouter);
app.use('/api/template', templateRouter);
app.use('/api/private', privateRouter);
app.use('/api/meme', memeRouter)

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
