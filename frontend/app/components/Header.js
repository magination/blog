var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
    render: function () {
        return (
            <div className="encapsulateSiteHeader">
                <div className="siteHeader">
                    <Link to="/" ><img src="http://res.cloudinary.com/magination/image/upload/v1437219036/logo2_pez3ao.png"/></Link>
                </div>
            </div>
        );
    }
});

module.exports = Header;
