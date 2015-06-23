var React = require("react");
var AllBlogsStore = require("../stores/AllBlogsStore");
var BlogActions = require("../actions/BlogActions");

function getState() {
    return {
        blogs: AllBlogsStore.getAllBlogs()
    };
}

var BlogView = React.createClass({
	_onChange: function(){
        this.setState(getState());
    },
    componentDidMount: function() {
        AllBlogsStore.addChangeListener(this._onChange);
        BlogActions.fetchAll();
    },
    componentWillUnmount: function() {
        AllBlogsStore.removeChangeListener(this._onChange);
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
