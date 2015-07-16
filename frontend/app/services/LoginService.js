var request = require('superagent');
var requestHandler = require('./requestHandler');
var Promise = require('bluebird');

var LoginService = {
    login: function (username, password) {
        console.log('loginservice logging in');
        return new Promise(function (resolve, reject) {
            request
                .post('/login', {username: username, password: password})
                .on('error', requestHandler.error(reject))
                .end(function (err, res) {
                    console.log('result', res);
                    requestHandler.response(resolve, reject, err, res)
                });
        })
    }
}

module.exports = LoginService;