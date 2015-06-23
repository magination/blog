var React = require('react');
var Router = require('react-router');
var BlogView = require('./components/BlogView');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
	render: function(){
	  return (
         <div className="App">
	          <RouteHandler/>
	      </div>
	    );
	}
});

var routes = (
  	<Route handler={App}>
		<DefaultRoute handler={BlogView}/>
  	</Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});