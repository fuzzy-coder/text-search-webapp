const CSVReader = require('csvtojson')
const _ = require('lodash')
const TextSearach = require('text-search')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');

var app = express();

let searchIndex;
(async function () {
  try {
    let data = await CSVReader().fromFile('./data.csv')
    if (data) {
      searchIndex = new TextSearach({
        nGramLowerLimit: 3,
        nGramUpperLimit: 4,
        dataSet: _.map(data, datum => `${datum.givenName.trim()} ${datum.middleName.trim()} ${datum.surname.trim()}`)
      })

      startServer()
    }
  } catch (error) {
    console.error(`Error Loading/Creating reverse index :: ${error}`)
    console.error(`Please make sure you have added data.csv in root dir`)
    console.error(`data.csv should contain column headers in the following order`)
    console.error(`givenName, middleName, surname`)
    process.exit(0)
  }
})()

function startServer() {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.set('searchIndex', searchIndex)

  app.use(logger('dev'));
  app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }))
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/search', searchRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }); 
}

module.exports = app;