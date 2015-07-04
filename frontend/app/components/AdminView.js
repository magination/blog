var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var lodash = require('lodash');
var AdminStore = require("../stores/AdminStore");

var AdminView = React.createClass({
	_onChange: function(){
        this.setState(getState());
    },
    componentDidMount: function() {
        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    render: function() {
        return <h1>Admin</h1>
    }
});

module.exports = AdminView;
