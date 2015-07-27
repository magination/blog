var React = require("react");
var ReactRouter = require("react-router");
var Navigation = ReactRouter.Navigation;

var LoginActions = require('../actions/LoginActions');
var LoginStore = require('../stores/LoginStore');

var LoginView = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return {userMessage: ""};
    },
    _onChange: function(){
        if (LoginStore.getFeedback().status === 200) {
            this.transitionTo('admin');
        } else {
            this.setState({userMessage: LoginStore.getFeedback()});
        }
    },
    componentDidMount: function(){
      LoginStore.addChangeListener(this._onChange);
    },
    render: function() {

        return (
            <div>
                <h1> Log in! </h1>
                <form onSubmit={this._login}>
                    <label htmlFor="username"> Username </label>
                    <input type="text" ref="username" name="username" required/>
                    <label htmlFor="password"> Password </label>
                    <input type="password" ref="password" name="password" required/>
                    <input type="submit" value="Login" />
                </form>
                <p>{this.state.userMessage}</p>
            </div>
            );
    },
    _login: function() {
        event.preventDefault();

        var username = React.findDOMNode(this.refs.username).value;
        var password = React.findDOMNode(this.refs.password).value;


        LoginActions.login(username, password);
    }
});

module.exports = LoginView;
