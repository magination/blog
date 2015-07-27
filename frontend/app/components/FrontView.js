var React = require("react");

var AllBlogPostsStore = require("../stores/AllBlogPostsStore");
var BlogActions = require("../actions/BlogActions");
var PreviewBlogComponent = require('./PreviewBlogComponent');
var Header = require('./Header');
var lodash = require('lodash');
var Footer = require('./Footer');

function getState() {
    return {
        blogs: AllBlogPostsStore.getAllBlogs()
    };
}

var FrontView = React.createClass({
    _onChange: function () {
        this.setState(getState());
    },
    componentDidMount: function () {
        AllBlogPostsStore.addChangeListener(this._onChange);
        BlogActions.fetchAllClient();
    },
    componentWillUnmount: function () {
        AllBlogPostsStore.removeChangeListener(this._onChange);
    },
    getInitialState: function () {
        return getState();
    },
    render: function () {
        return (
            <div className="SiteContainer">
                <Header />
                <div className="postContainer">
                    <div className="clear-both"/>
                    {this.previewList()}
                </div>
                <Footer />
            </div>
        );
    },
    previewList: function() {
        if (this.state.blogs[0]) {
            var previewList = [];

            for (var post in this.state.blogs) {
                previewList.push(this.state.blogs[post]);
            }

            return lodash.map(previewList, function (post, key) {
                return <PreviewBlogComponent key={key} blogpost={post}/>;
            });
        }

        return <div></div>;
    }
});

module.exports = FrontView;
