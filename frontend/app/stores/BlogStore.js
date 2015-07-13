var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var CHANGE_EVENT = 'change-blogstore';

var _blog = {}
var _title = "";
var _body = "";
var _author = "";


function loadBlog(data) {
    _blog = data;
    _title = data.title;
    _body = data.body;
    //todo: Fallback for testing purposes, remove when user system is stable
    _author = data.author ? data.author.username : "Magination";
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
    getBlogBody: function() {
        return _body;
    },
    getAuthor: function(){
        return _author;
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