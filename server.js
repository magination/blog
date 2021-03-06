var express         = require('express');
var session 		= require('express-session')
var bodyParser      = require('body-parser');
var router          = require('./routes');
var mongoose        = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var passport        = require('passport');
var baucis          = require('baucis');
var user 			= require('./models/user');
var cookieParser    = require('cookie-parser');

require('./updates/init');

var app = express();

app.use(express.static(__dirname + '/static'));
app.use(session({ 
	secret: 'topsecret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


app.use('/', router(app));

app.listen(3001, function() {
    console.log('Running on port:3001');
});
