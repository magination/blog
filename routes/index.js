'use strict';
var express = require('express');
var path = require('path');
var baucis = require('baucis');
var router = express.Router();
var auth = require('./auth')


router.post('/login', auth, function(req, res) {
    res.send('Hello! '+ req.user.username);
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

module.exports = router;
