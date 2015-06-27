var request = require('superagent');
//var requestHandler = require('./requestHandler');
var Promise = require('bluebird');

var blogZero = {'title': 'titelZero', 'content': 'the text for blog zero'};
var blogOne = {'title': 'titelOne', 'content': 'the text for blog one'};
var blogTwo = {'title': 'titelTwo', 'content': 'the text for blog two'};
var blogs = {0:  blogZero, 1: blogOne, 2: blogTwo};

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
    },
    getAllBlogs: function () {
        return blogs;
    }
};

module.exports = BloggClient;