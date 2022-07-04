var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'zh'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  retryInDefaultLocale: true,
  cookie: 'lang'
});

const retAmisJSONRouter = require('./routes/amis/ret_json');
const pageRoutes = require('./routes/show_page');
const getTorrentsRouter = require('./routes/api/getTorrents');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use('/', pageRoutes.about);
app.use('/', pageRoutes.home);
app.use('/', pageRoutes.torrents);
app.use('/', pageRoutes['/']);
app.use('/', retAmisJSONRouter);
app.use('/', getTorrentsRouter);

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
