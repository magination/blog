var request = require('superagent');
var Promise = require('bluebird');
Promise.promisifyAll(request);

var LoginService = {
    login: function (username, password) {
        return request
            .post('/login', {username: username, password: password})
            .endAsync()
            .then(function(res){
                if (res.ok) {return res; }
                throw res.text;
            });
    },
    authenticate: function () {
        return request
            .get('/authenticate')
            .endAsync()
            .then(function (res) {
                if (res.ok) {return res; }
                throw res.text;
            });
    }
};

module.exports = LoginService;
