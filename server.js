var express         = require('express');
var bodyParser      = require('body-parser');
var router          = require('./routes');
var mongoose        = require('mongoose');
mongoose.connect('mongodb://localhost/magination');
var passport        = require('passport');
var baucis          = require('baucis');

require('./updates/init');

var app = express();

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', router(app));

app.listen(3000, function() {
    console.log('Running on port:3000');
});
