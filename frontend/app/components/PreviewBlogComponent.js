var React =  require('react');

var previewBlogComponent = React.createClass({
    render: function(){
        return(
            <div>
            <h2> {this.props.blogpost.title} </h2>
            <p> {this.props.blogpost.content} </p>
            </div>
        )
    }
});

module.exports = previewBlogComponent;