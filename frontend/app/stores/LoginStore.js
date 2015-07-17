var Dispatcher = require('../dispatcher/Dispatcher');
var BlogConstants = require('../constants/BlogConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require("lodash");
var CHANGE_EVENT = 'change-blogstore';

var feedback;

var LoginStore = _.extend({}, EventEmitter.prototype, {
    getFeedback: function(){
        return feedback;
    },
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT,callback);
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

LoginStore.dispatchToken = Dispatcher.register(function(action) {
    switch (action.actionType) {
        case BlogConstants.LOGIN_COMPLETED:
            feedback = action.data;
            LoginStore.emitChange();
            break;
        case BlogConstants.LOGIN_ERROR:
            feedback = action.error;
            LoginStore.emitChange();
            break;
    }
});

module.exports = LoginStore;