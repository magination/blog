var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var AllBlogPostsStore = require("../stores/AllBlogPostsStore");
var BlogActions = require("../actions/BlogActions");
var PreviewBlogComponent = require('./PreviewBlogComponent');
var lodash = require('lodash');

function getState() {
    return {
        blogs: AllBlogPostsStore.getAllBlogs()
    };
}

var FrontView = React.createClass({
	_onChange: function(){
        this.setState(getState());
    },
    componentDidMount: function() {
        AllBlogPostsStore.addChangeListener(this._onChange);
        BlogActions.fetchAllClient();
    },
    componentWillUnmount: function() {
        AllBlogPostsStore.removeChangeListener(this._onChange);
    },
    getInitialState: function() {
        return getState();
    },
    render: function() {
        if(this.state.blogs[0]){
            var previewList = [];
            for (var post in this.state.blogs) {
                previewList.push(this.state.blogs[post]);
            }
            previewList = lodash.map(previewList, function(post, key) {
                return <PreviewBlogComponent key={key} blogpost={post}/>
            })
            return(
            <div className="SiteContainer">
                <h1>Magination Blog</h1>
                <div className="postContainer">
                <Link to={"/"} className="create-blog-link">Create blog post</Link>
                <div className="clear-both" />
                {previewList}
                </div>
            </div>
            )}
        else{
            return(
            <div>
            </div>)
        }
    }
});

module.exports = FrontView;
