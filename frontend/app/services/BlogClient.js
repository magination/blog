var request = require('superagent');
//var requestHandler = require('./requestHandler');
var Promise = require('bluebird');

var BloggClient = {
    /*get: function () {
        return new Promise(function (resolve, reject) {
            request
                .get('api/Blogg')
                .on('error', requestHandler.error(reject))
                .end(function(err, res){
                	requestHandler.response(resolve, reject, err, res)
                });
        })
    }*/
    get: function () {
        return {'title': 'tittelen', 'content': 'the text'};
    }
};

module.exports = BloggClient;