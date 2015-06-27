var React = require("react");
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
        BlogActions.fetchAll();
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
                {previewList}
                </div>
            </div>
            )}
        else{
            return(
            <div>
            <h1>NOT LOADED</h1>
            </div>)
        }
    }
});

module.exports = FrontView;
