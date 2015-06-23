var React = require("react");
var BlogStore = require("../stores/BlogStore");
var BlogActions = require("../actions/BlogActions");

function getState() {
    return {
        blog: BlogStore.getBlog()
    };
}

var BlogView = React.createClass({
	_onChange: function(){
        this.setState(getState());
    },
    componentDidMount: function() {
        BlogStore.addChangeListener(this._onChange);
        BlogActions.fetch();
    },
    componentWillUnmount: function() {
        BlogStore.removeChangeListener(this._onChange);
    },
    getInitialState: function() {
        return  getState();
    },
    render: function() {
        return <div>
            <h1>{this.state.blog.title}</h1>
            <p>{this.state.blog.content}</p>
        </div>
    }
});

module.exports = BlogView;
