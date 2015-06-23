var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var BlogClient = require('../services/BlogClient');

var BlogActions = {

    fetch: function () {
        Dispatcher.dispatch({
            actionType: BlogConstants.BLOG_FETCH
        });
        var blog = BlogClient.get();
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
    }
};

module.exports = BlogActions;