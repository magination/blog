var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var BlogClient = require('../services/BlogClient');

var BlogActions = {

    savePost: function (post) {
        Dispatcher.dispatch({
            actionType: BlogConstants.BLOG_POST_SAVE
        });
        BlogClient.saveBlogPost(post)
            .then(function (data) {
                Dispatcher.dispatch({
                    actionType: BlogConstants.BLOG_POST_SAVE_SUCCESS,
                    data: data
                });
            }, function (error) {
                Dispatcher.dispatch({
                    actionType: BlogConstants.BLOG_POST_SAVE_FAIL,
                    error: error
                });
            });
    },
};

module.exports = BlogActions;