var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var CHANGE_EVENT = 'change-bekkbok';

var _blog = {}
var _title = "";
var _content = "";


function loadBlog(data) {
    console.log(data);
    console.log(data.title);
    console.log(data.content);
    _blog = data;
    _title = data.title;
    _content = data.content;
}

function fetchFailed(error) {
    _blog._hasErrors = true;
    _blog.errors = _blog.errors || [];
    _blog.errors.push(error);
}

var BlogStore = _.extend({}, EventEmitter.prototype, {
    getBlog: function(){
        return _blog;
    },
    getBlogTitle: function() {
        return _title;
    },
    getBlogContent: function() {
        return _content;
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

BlogStore.dispatchToken = Dispatcher.register(function(action) {
    switch(action.actionType) {
        case BlogConstants.BLOG_FETCH:
            BlogStore.emitChange();
            break;
        case BlogConstants.BLOG_FETCH_SUCCESS:
            loadBlog(action.data);
            BlogStore.emitChange();
            break;
        case BlogConstants.BLOG_FETCH_FAIL:
            fetchFailed(action.error);
            BlogStore.emitChange();
            break;
        default:
    };

    return true;
});

module.exports = BlogStore;