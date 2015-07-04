var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var CHANGE_EVENT = 'change-allblogposts';

var _blogs = {}


function loadBlog(data) {
    _blogs = data;
}

function fetchFailed(error) {
    _blog._hasErrors = true;
    _blog.errors = _blog.errors || [];
    _blog.errors.push(error);
}

var AllBlogsStore = _.extend({}, EventEmitter.prototype, {
    getAllBlogs: function(){
        return _blogs;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AllBlogsStore.dispatchToken = Dispatcher.register(function(action) {
    switch(action.actionType) {
        case BlogConstants.ALL_BLOG_FETCH:
            AllBlogsStore.emitChange();
            break;
        case BlogConstants.ALL_BLOG_FETCH_SUCCESS:
            loadBlog(action.data);
            AllBlogsStore.emitChange();
            break;
        case BlogConstants.ALL_BLOG_FETCH_FAIL:
            fetchFailed(action.error);
            AllBlogsStore.emitChange();
            break;
        default:
    };

    return true;
});

module.exports = AllBlogsStore;