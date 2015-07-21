var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var previewBlogComponent = React.createClass({
    propTypes: {
        blogpost: React.PropTypes.object
    },
    render: function(){
        //If body is larger than 1000 chars, limit to 1000 and add dotdotdot
        var body = this.props.blogpost.body.length > 1000 ? this.props.blogpost.body.substring(0, 1000) + "..." : this.props.blogpost.body;
        var author = this.props.blogpost.author ? this.props.blogpost.author.username : "Magination";
        return (
            <div className="blogPostPreview">
                <h2> <Link to={'/post/' + this.props.blogpost.slug}> {this.props.blogpost.title} </Link> </h2>
                <div className="author">Written by: <span className="authorName"> {author} </span></div>
                <div className="blog-preview-body" dangerouslySetInnerHTML={{__html: body}}/>
                <Link to={'/post/' + this.props.blogpost.slug}><button name="readMoreButton">Read more</button></Link>
                <hr />
            </div>
        );
    }
});

module.exports = previewBlogComponent;
