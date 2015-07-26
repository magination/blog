var React = require("react");


var Footer = React.createClass({
    render: function () {
        return (
            <div className="encapsulateSiteFooter">
                <div className="createdBy">
                    <ul>
                        <li> Created by <a href="http://www.magination.no">Magination </a></li>
                        <li><iframe src="https://ghbtns.com/github-btn.html?user=magination&repo=blog&type=fork&count=false" scrolling="0" width="170px" height="20px" frameBorder="0"></iframe></li>
                    </ul>
                </div>
                <div className="socialMediaLinks">
                    <li><a href="https://www.facebook.com/maginationgame"><img src="http://res.cloudinary.com/magination/image/upload/v1437503444/1437521335_Social_networks_Facebook_ei6bfp.svg"/></a></li>
                    <li><a href="https://twitter.com/maginationgame"><img src="http://res.cloudinary.com/magination/image/upload/v1437503444/1437521344_Social_networks_Tumblr_tzgnax.svg"/></a></li>
                    <li><a href="https://instagram.com/maginationgame/"><img src="http://res.cloudinary.com/magination/image/upload/v1437503444/1437521361_Social_networks_Instagram_toklmq.svg"/></a></li>
                </div>
            </div>
        );
    }
});

module.exports = Footer;
