var React =  require('react');

var previewBlogComponent = React.createClass({
    render: function(){
        return(
            <div className="blogPostPreview">
            <h2> {this.props.blogpost.title} </h2>
            <p> {this.props.blogpost.body} </p>
            </div>
        )
    }
});

module.exports = previewBlogComponent;