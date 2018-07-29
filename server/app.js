var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var http = require('http');
var debug = require('debug')('tt-mean:server');


var app = express();


app.use(cors({ origin:`http://localhost:4200` }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// connect mongodb
mongoose.connect('mongodb://localhost:27017/tt-mean-db', { useNewUrlParser: true })
  .then( () => {console.log(`Mongoose is connected!`)});

// get routes
require('./routes-barrel')(app);
app.get(`/`, function (req, res) {
  res.send(`Hello in tt-mean!`)
})

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

app.listen(3010, function () {
  console.log(`Server listening on port 3010.`)
});
