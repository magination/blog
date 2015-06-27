var React =  require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var previewBlogComponent = React.createClass({
    render: function(){
        return(
            <div className="blogPostPreview">
                <h2> <Link to={`/post/${this.props.blogpost.title}`}>{this.props.blogpost.title} </Link> </h2>
                <div className="author"><p> Written by: <span className="authorName"> Juul Arthur </span> </p></div>
                <p> {this.props.blogpost.body} </p>
                <button name="readMoreButton">Read more</button>
            </div>
        )
    }
});

module.exports = previewBlogComponent;