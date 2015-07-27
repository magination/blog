var React = require('react');
var Navigation = require('react-router').Navigation;
var cx = require('classnames');

var AdminStore = require('../stores/AdminStore');
var LoginStore = require('../stores/LoginStore');
var AdminActions = require('../actions/AdminActions');
var LoginActions = require('../actions/LoginActions');

function getState() {
    return {
        feedback: AdminStore.getFeedback(),
        loginFeedback: LoginStore.getFeedback()
    };
}


var AdminView = React.createClass({
    mixins: [Navigation],
	_onChange: function(){
        this.setState(getState());
        if (LoginStore.getFeedback().status === 401) {
            this.transitionTo('home');
        }
    },
    getInitialState: function () {
        return {
            feedback: AdminStore.getFeedback(),
            loginFeedback: LoginStore.getFeedback(),
            content: ""
        };
    },
    componentDidMount: function() {
        AdminStore.addChangeListener(this._onChange);
        LoginStore.addChangeListener(this._onChange);
        LoginActions.authenticate();

        setTimeout(this.initTinyMCE, 100);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    componentwillreceiveprops: function() {
        this.initTinyMCE();
    },
    render: function() {
        var hidden = cx({
            'hidden': this.state.loginFeedback.message !== "Authorized"
        });

        return (
            <div className={hidden}>
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
        AdminActions.savePost({title: e.target.title.value, body: this.state.content, author: this.state.loginFeedback.userID});
    },
    handleChange: function(value) {
        this.setState({content: value});
    },
    initTinyMCE: function() {
        var that = this;

        tinymce.init({
            mode: "exact",
            elements: "area1",
            setup: function(editor) {
                editor.on('change', function() {
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
    }
});

module.exports = AdminView;
