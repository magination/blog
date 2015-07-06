var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var lodash = require('lodash');
var AdminStore = require('../stores/AdminStore');
var AdminActions = require('../actions/AdminActions')

function getState() {
    return {
        feedback: AdminStore.getFeedback
    };
};


var AdminView = React.createClass({
	_onChange: function(){
        this.setState(getState());
    },
    getInitialState: function () {
        return {feedback: ''};
    },
    componentDidMount: function() {
        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    savePost: function(e) {
        e.preventDefault();
        console.log(e.target.title.value);
        console.log(e.target.content.value);
        AdminActions.savePost({title: e.target.title.value, body: e.target.content.value, author: '558ebbafa59d66a0056f5abf'});
    },
    render: function() {
        var editorStyle = {
            overflow: 'auto',
            width: 300,
            height: 100,
            maxHeight: 100
        }
        return (
            <div>
                <h1>Admin</h1>
                <form onSubmit={this.savePost}>
                    <label>Title:</label>
                    <input type="text" placeholder="Write the title" name="title"></input>
                    <label>Content:</label>
                    <textarea id="adminContent" name="content"/>
                    <input type="submit" />
                </form>
                <p>{this.state.feedback}</p>

            </div>
            );
    }
});

module.exports = AdminView;
