const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHelper = require('./helper/errorHelper');

// router
const index = require('./routes');
const auth = require('./routes/auth/index');
const member = require('./routes/member/index');

// app
const app = express();

// cors
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use static
app.use(express.static('views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// router load
app.use('/', index);
app.use('/images', express.static('upload/images'));
app.use('/auth', auth);
app.use('/member', member);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({ status: 404, code: 'Not Found' });
});

// error handler
app.use(function(err, req, res, next) {
  let error = errorHelper(err);

  // send json
  res.status(error.status).json(error);
});

module.exports = app;
