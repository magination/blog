var React = require("react");
var BlogStore = require("../stores/BlogStore");
var BlogActions = require("../actions/BlogActions");
var Router = require('react-router');
var Router = Router;


function getState() {
    return {
        title: BlogStore.getBlogTitle(),
        body: BlogStore.getBlogBody()
    };
}

var BlogPostView = React.createClass({
    mixins: [ Router.State ],
	_onChange: function(){
        this.setState(getState());
    },
    componentDidMount: function() {
        BlogStore.addChangeListener(this._onChange);
        BlogActions.fetch(this.getParams().id);
    },
    componentWillUnmount: function() {
        BlogStore.removeChangeListener(this._onChange);
    },
    getInitialState: function() {
        return  getState();
    },
    render: function() {
        return <div>
            <h1 className="blog-post-title">{this.state.title}</h1>
            <p>{this.state.body}</p>
        </div>
    }
});

module.exports = BlogPostView;
