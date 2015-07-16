var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var lodash = require('lodash');
var AdminStore = require('../stores/AdminStore');
var AdminActions = require('../actions/AdminActions')

function getState() {
    return {
        feedback: AdminStore.getFeedback,
        conten: ""
    };
};


var AdminView = React.createClass({
	_onChange: function(){
        this.setState(getState());
    },
    getInitialState: function () {
        return {feedback: '', content: ''};
    },
    componentDidMount: function() {
        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    render: function() {
        var that = this;

        tinymce.init({
            mode: "exact",
            elements: "area1",
            setup : function(editor) {
                editor.on('change', function(e) {
                    that.handleChange(editor.getContent());
                });
            },
            plugins: [ "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern imagetools"],
            toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            toolbar2: "print preview media | forecolor backcolor emoticons",
            height: 500,
            selector: "#adminContent"
        });

        return (
            <div>
                <h1>Admin</h1>
                <form onSubmit={this.savePost}>
                    <label>Title:</label>
                    <br/>
                    <input type="text" placeholder="Write the title" name="title"></input>
                    <br/>
                    <label>Content:</label>
                    <br/>
                    <textarea id="adminContent" name="content" value={this.state.content} onChange={this.handleChange}/>
                    <input type="submit" />
                </form>
                <p>{this.state.feedback}</p>

            </div>
            );
    },
    savePost: function(e) {
        e.preventDefault();
        AdminActions.savePost({title: e.target.title.value, body: this.state.content, author: '558ebbafa59d66a0056f5abf'});
    },
    handleChange: function(value) {
        this.setState({content: value});
    }
});

module.exports = AdminView;
