var React =  require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var previewBlogComponent = React.createClass({
    render: function(){
        //If body is larger than 1000 chars, limit to 1000 and add dotdotdot
        var body = this.props.blogpost.body.length > 1000 ? this.props.blogpost.body.substring(0,1000) + "..." : this.props.blogpost.body;
        return(
            <div className="blogPostPreview">
                <h2> <Link to={'/post/'+this.props.blogpost.slug}>{this.props.blogpost.title} </Link> </h2>
                <div className="author"><p> Written by: <span className="authorName"> Juul Arthur </span> </p></div>
                <p> {body} </p>
                <Link to={'/post/'+this.props.blogpost.slug}><button name="readMoreButton">Read more</button></Link>
            </div>
        )
    }
});

module.exports = previewBlogComponent;
