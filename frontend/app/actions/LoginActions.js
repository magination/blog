var Dispatcher = require('../dispatcher/Dispatcher');
var LoginService = require('../services/LoginService');
var BlogConstants = require('../constants/BlogConstants');

var LoginActions = {
    login: function(username, password){
        Dispatcher.dispatch({
          actionType: BlogConstants.LOGIN
        });
        console.log('YOLO');
        LoginService.login(username, password)
        .then(function(data){
                console.log('data got:', data);
                console.log("Login completed in action");
                Dispatcher.dispatch({
                    actionType: BlogConstants.LOGIN_COMPLETED,
                    data: data
                })
            }, function(error){
                console.log("LoginError in action");
                Dispatcher.dispatch({
                    actionType: BlogConstants.LOGIN_ERROR,
                    error: error
                });
            })
    }
};

module.exports = LoginActions;