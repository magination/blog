var Dispatcher = require('../dispatcher/Dispatcher');
var LoginService = require('../services/LoginService');
var BlogConstants = require('../constants/BlogConstants');

var LoginActions = {
    login: function(username, password){
        Dispatcher.dispatch({
          actionType: BlogConstants.LOGIN
        });
        LoginService.login(username, password)
        .then(function(data){
                Dispatcher.dispatch({
                    actionType: BlogConstants.LOGIN_COMPLETED,
                    data: data
                });
            }, function(error){
                Dispatcher.dispatch({
                    actionType: BlogConstants.LOGIN_ERROR,
                    error: error
                });
            });
    },
    authenticate: function(){
        Dispatcher.dispatch({
          actionType: BlogConstants.AUTHENTICATE
        });
        LoginService.authenticate()
        .then(function(data){
            Dispatcher.dispatch({
                actionType: BlogConstants.AUTHENTICATE_COMPLETED,
                data: data
            });
        }, function(error){
            Dispatcher.dispatch({
                actionType: BlogConstants.AUTHENTICATE_ERROR,
                error: error
            });
        });
    }
};

module.exports = LoginActions;
