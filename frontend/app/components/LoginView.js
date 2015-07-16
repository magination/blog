var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var lodash = require('lodash');
var LoginActions = require('../actions/LoginActions');
var LoginStore = require('../stores/LoginStore');

var LoginView  = React.createClass({
    _onChange : function(){
        console.log("New feedback:", LoginStore.getFeedback());
    },
    _login : function() {
        event.preventDefault();

        var username = React.findDOMNode(this.refs.username).value;
        var password = React.findDOMNode(this.refs.password).value;

        console.log(username, password);

        LoginActions.login(username, password);
    },
    componentDidMount(){
      LoginStore.addChangeListener(this._onChange);
    },
    render: function() {
    return <div>
        <h1> Log in or face termination! </h1>
        <form onSubmit={this._login}>
            <label for="username"> Username </label>
            <input type="text" ref="username" name="username"/>
            <label for="password"> Password </label>
            <input type="password" ref="password" name="password"/>
            <input type="submit" value="Login" />
        </form>
    </div>
    }
});

module.exports = LoginView;