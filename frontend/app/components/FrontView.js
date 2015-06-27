var React = require("react");
var AllBlogPostsStore = require("../stores/AllBlogPostsStore");
var BlogActions = require("../actions/BlogActions");

function getState() {
    return {
        blogs: AllBlogPostsStore.getAllBlogs()
    };
}

var BlogView = React.createClass({
	_onChange: function(){
        this.setState(getState());
    },
    componentDidMount: function() {
        AllBlogPostsStore.addChangeListener(this._onChange);
        BlogActions.fetchAll();
    },
    componentWillUnmount: function() {
        AllBlogPostsStore.removeChangeListener(this._onChange);
    },
    getInitialState: function() {
        return  getState();
    },
    render: function() {
        return <div>
            <h1>{this.state.blogs}</h1>
        </div>
    }
});

module.exports = BlogView;
