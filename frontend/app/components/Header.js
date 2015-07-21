var React = require("react");


var Header = React.createClass({
    render: function () {
        return (
            <div className="encapsulateSiteHeader">
                <div className="siteHeader">
                    <img src="http://res.cloudinary.com/magination/image/upload/v1437219036/logo2_pez3ao.png"/>
                </div>
            </div>
        );
    }
});

module.exports = Header;
