var request = require('superagent');
//var requestHandler = require('./requestHandler');
var Promise = require('bluebird');

var blogOne = {'title': 'titelOne', 'content': 'the text for blog one'};
var blogTwo = {'title': 'titelTwo', 'content': 'the text for blog two'};
var blogThree = {'title': 'titelThree', 'content': 'the text for blog three'};
var blogs = {1:  blogOne, 2: blogTwo, 3: blogThree};

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
    getBlog: function (id) {
        return blogs[id];
    }
};

module.exports = BloggClient;