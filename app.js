var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongo = require('mongodb').MongoClient

// set url details from envvar.
// username and password are optional and signal
// local dev mode ...

var url = new URL(process.env.MONGO_URI)

var passwd=process.env.MONGO_PASSWORD
if(passwd!=null) url.password=passwd

var username=process.env.MONGO_USERNAME
if(username!=null) url.username=username


var collection

mongo.connect(url.href, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db(process.env.MONGO_DB)
  collection = db.collection('signups')

})




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index', {
        static_path: 'static',
        theme: process.env.THEME || 'flatly',
        flask_debug: process.env.FLASK_DEBUG || 'false'
    });
});



    app.post('/signup', function(req, res) {

        var item = {
            '_id' :  req.body.email,
            'name': req.body.name,
            'preview':  req.body.previewAccess,
            'theme': req.body.theme
        };

        collection.insertOne(item, (err, result) => {
            if(err) {
              if (err.code==11000) {
                  res.status(409).end();
              }
              res.status(500).end();
            }
            else  {
                collection.countDocuments({}, function(err,count) {

                  res.status(201).send({count:count}).end();
                })

            }
        });

    });


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

module.exports.app = app;
