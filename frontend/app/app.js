var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var GoogleAnalytics = require('react-g-analytics');

var BlogPostView = require('./components/BlogPostView');
var FrontView = require('./components/FrontView');
var AdminView = require('./components/AdminView');
var LoginView = require('./components/LoginView');

var App = React.createClass({
    render: function () {
        return (
            <div className="App">
                <GoogleAnalytics id="UA-44245810-2" />
                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Route handler={App}>
        <Route path="/login" handler={LoginView}/>
        <Route name="admin" path="/admin" handler={AdminView}/>
        <Route path="/post/:id" handler={BlogPostView}/>
        <DefaultRoute name="home" handler={FrontView}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});
