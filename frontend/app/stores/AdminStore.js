var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var CHANGE_EVENT = 'change-admin';

var _feedback = "";

function setFeedback(data) {
    _feedback = data;
}

var BlogStore = _.extend({}, EventEmitter.prototype, {
    getFeedback: function() {
        return _feedback;
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
        case BlogConstants.BLOG_POST_SAVE:
            BlogStore.emitChange();
            break;
        case BlogConstants.BLOG_POST_SAVE_SUCCESS:
            setFeedback("Post saved!");
            BlogStore.emitChange();
            break;
        case BlogConstants.BLOG_POST_SAVE_FAIL:
            BlogStore.emitChange(action.error);
            break;
        default:
    }

    return true;
});

module.exports = BlogStore;
