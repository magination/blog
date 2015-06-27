var React = require("react");
var BlogStore = require("../stores/BlogStore");
var BlogActions = require("../actions/BlogActions");

function getState() {
    return {
        title: BlogStore.getBlogTitle(),
        content: BlogStore.getBlogContent()
    };
}

var BlogPostView = React.createClass({
	_onChange: function(){
        this.setState(getState());
    },
    componentDidMount: function() {
        BlogStore.addChangeListener(this._onChange);
        BlogActions.fetch(2);
    },
    componentWillUnmount: function() {
        BlogStore.removeChangeListener(this._onChange);
    },
    getInitialState: function() {
        return  getState();
    },
    render: function() {
        return <div>
            <h1>{this.state.title}</h1>
            <p>{this.state.content}</p>
        </div>
    }
});

module.exports = BlogPostView;
