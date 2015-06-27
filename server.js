var express         = require('express');
//var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var router          = require('./routes');
var baucis          = require('baucis');
var mongoose        = require('mongoose');
mongoose.connect('mongodb://localhost/magination');
//var passport        = require('passport');

require('./updates/init');
var app = express();

//mongoose.connect('mongodb://localhost:27017/test');

app.use(express.static(__dirname + '/frontend'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));


baucis.rest('post');
baucis.rest('user');
app.use('/api', baucis());
app.use('/', router);

app.listen(3000, function() {
    console.log('Running on port:3000');
});
