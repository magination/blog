var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var CHANGE_EVENT = 'change-login';

var _feedback = {status: -1};

var LoginStore = _.extend({}, EventEmitter.prototype, {
    getFeedback: function() {
        return _feedback;
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

LoginStore.dispatchToken = Dispatcher.register(function(action) {
    switch (action.actionType) {
        case BlogConstants.LOGIN_COMPLETED:
            _feedback = action.data;
            LoginStore.emitChange();
            break;
        case BlogConstants.LOGIN_ERROR:
            _feedback = action.error;
            LoginStore.emitChange();
            break;
        case BlogConstants.AUTHENTICATE_COMPLETED:
            _feedback = action.data;
            LoginStore.emitChange();
            break;
        case BlogConstants.AUTHENTICATE_ERROR:
            _feedback = action.error;
            LoginStore.emitChange();
            break;
    }
});

module.exports = LoginStore;
