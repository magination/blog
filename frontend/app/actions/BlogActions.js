var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var BlogClient = require('../services/BlogClient');

var BlogActions = {

    fetch: function (id) {
        Dispatcher.dispatch({
            actionType: BlogConstants.BLOG_FETCH
        });
        var blog = BlogClient.getBlog(id);
        Dispatcher.dispatch({
            actionType: BlogConstants.BLOG_FETCH_SUCCESS,
            data: blog
        });
        /*BlogClient.get()
            .then(function (data) {
                Dispatcher.dispatch({
                    actionType: BlogConstants.BLOG_FETCH_SUCCESS,
                    data: data
                });
            }, function (error) {
                Dispatcher.dispatch({
                    actionType: BlogConstants.BLOG_FETCH_FAIL,
                    error: error
                });
            });*/
    },
    fetchAll: function () {
        Dispatcher.dispatch({
            actionType: BlogConstants.ALL_BLOG_FETCH
        });
        var blogs = BlogClient.getAllBlogs();
        Dispatcher.dispatch({
            actionType: BlogConstants.ALL_BLOG_FETCH_SUCCESS,
            data: blogs
        });
    }
};

module.exports = BlogActions;