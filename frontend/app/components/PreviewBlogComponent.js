var React =  require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var previewBlogComponent = React.createClass({
    render: function(){
        return(
            <div className="blogPostPreview">
                <h2> <Link to={`/post/${this.props.blogpost.slug}`}>{this.props.blogpost.title} </Link> </h2>
                //If there is no user, a testuser is displayed. Should throw an error when system is in prod
                <div className="author"><p> Written by: <span className="authorName"> {this.props.blogpost.author ? this.props.blogpost.author.username : "Magination"} </span> </p></div>
                <p> {this.props.blogpost.body} </p>
                <Link to={`/post/${this.props.blogpost.slug}`}><button name="readMoreButton">Read more</button></Link>
            </div>
        )
    }
});

module.exports = previewBlogComponent;