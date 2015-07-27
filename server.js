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

new user({username: "Juul", password: "KAKEmann123!", fullname: "Juul Arthur Ribe Rudihagen"}).save();
new user({username: "Tobias", password: "KAKEmann123!", fullname: "Tobias Linkjendal"}).save();
new user({username: "Hanna", password: "KAKEmann123!", fullname: "Hanna Aanjesen"}).save();
new user({username: "Jorgen", password: "KAKEmann123!", fullname: "Jørgen Espnes"}).save();

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
