var React = require("react");
var BlogStore = require("../stores/BlogStore");
var BlogActions = require("../actions/BlogActions");
var Router = require('react-router');
var Header = require('./Header');
var Footer = require('./Footer');

function getState() {
    return {
        title: BlogStore.getBlogTitle(),
        body: BlogStore.getBlogBody(),
        author: BlogStore.getAuthor()
    };
}

var BlogPostView = React.createClass({
    mixins: [Router.State],
    _onChange: function () {
        this.setState(getState());
    },
    componentDidMount: function () {
        BlogStore.addChangeListener(this._onChange);
        BlogActions.fetch(this.getParams().id);
    },
    componentWillUnmount: function () {
        BlogStore.removeChangeListener(this._onChange);
    },
    getInitialState: function () {
        return getState();
    },
    render: function () {

        return (
            <div>
                <Header />
                <div className="blog-post-container">
                    <h1 className="blog-post-title">{this.state.title}</h1>
                    <div className="written-by"> Written by: {this.state.author} </div>
                    <div className="blog-body" > <p dangerouslySetInnerHTML={{__html: this.state.body}} ></p> </div>
                </div>
                <Footer />
            </div>
        );
    }
});

module.exports = BlogPostView;
