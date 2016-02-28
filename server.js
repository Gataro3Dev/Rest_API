var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport')
//inicializando mongoose schema
require('./models/models.js');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat');

var app = express();


app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.use(session({
  secret: 'Keyboard cat'
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);
app.use('/auth', authenticate);

//inicializando el passport
var initPassport = require('./pass-init.js');
initPassport(passport);

app.listen(3000);

module.exports = app;
