var request = require('superagent');
var requestHandler = require('./requestHandler');
var Promise = require('bluebird');

var BloggClient = {
    getAllBlogs: function () {
        return new Promise(function (resolve, reject) {
            request
                .get('/api/posts?sort=-_id')
                .on('error', requestHandler.error(reject))
                .end(function(err, res){
                    requestHandler.response(resolve, reject, err, res);
                });
        });
    },
    getBlogPost: function (id) {
        var url = '/api/posts/' + id;
        return new Promise(function (resolve, reject) {
            request
                .get(url)
                .on('error', requestHandler.error(reject))
                .end(function(err, res){
                    requestHandler.response(resolve, reject, err, res);
                });
        });
    },
    saveBlogPost: function (post) {
        return new Promise(function (resolve, reject) {
            request
                .post('/api/posts/', post)
                .on('error', requestHandler.error(reject))
                .end(function(err, res){
                    requestHandler.response(resolve, reject, err, res);
                });
        });
    }
};

module.exports = BloggClient;
