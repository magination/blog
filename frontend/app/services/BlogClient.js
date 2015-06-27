var request = require('superagent');
//var requestHandler = require('./requestHandler');
var Promise = require('bluebird');

var blogZero = {'title': 'Magination is officially blogging', 'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie dolor non nibh feugiat, vitae rutrum sapien luctus. Quisque nibh justo, lacinia et lorem auctor, placerat fermentum felis. Fusce volutpat hendrerit magna, ac scelerisque enim ultricies vitae. Sed elementum mauris ac interdum molestie. Curabitur ullamcorper feugiat varius. Quisque nec erat porta, vehicula tortor in, hendrerit sem. Integer rhoncus egestas ex ac accumsan. Phasellus sem urna, aliquet sagittis massa porttitor, ultricies luctus massa. Sed placerat augue sagittis, laoreet augue egestas, volutpat nisi. Vestibulum sit amet accumsan purus.' };
var blogOne = {'title': 'Magination has hired an awesome programmer - Meet HK', 'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nisi velit. Vivamus suscipit iaculis leo, non suscipit ligula molestie sit amet. Fusce libero urna, cursus vel convallis sed, euismod at nisl. Donec arcu justo, consectetur id sem at, bibendum ornare lacus. Phasellus ultricies lacinia porta. Duis molestie dui mi, quis sagittis orci auctor in. Pellentesque finibus ligula nisl, eu aliquet mauris tincidunt eget. Nullam faucibus purus sed ipsum bibendum, at molestie urna vehicula. Aliquam erat volutpat. Donec vitae arcu turpis. Nunc imperdiet dictum luctus. Donec a dapibus tellus. Donec condimentum, massa at porttitor euismod, neque diam auctor elit, nec vulputate libero lorem at nisi. Duis eu magna aliquet, viverra arcu ut, egestas libero. Quisque lectus odio, finibus non turpis.'};
var blogTwo = {'title': 'Get attractive!', 'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis magna ultrices, tincidunt lectus nec, consectetur nisi. Etiam imperdiet arcu nunc, ut pharetra dolor feugiat nec. Donec a gravida lorem. Morbi non imperdiet odio. Aenean sed sem accumsan ante finibus ullamcorper ac sit amet arcu. Nulla vulputate ligula felis, sed fringilla nisi lobortis vitae. Cras luctus accumsan scelerisque. Curabitur ultrices, massa vitae ultrices elementum, magna lorem fermentum nulla, ut imperdiet sapien orci eget tortor. Ut sagittis posuere nisl, ut ultricies nisi accumsan vitae. Sed malesuada, neque a faucibus commodo, ipsum urna vehicula felis, aliquam auctor nisl enim in ipsum. Aliquam maximus, turpis id rutrum elementum, nunc metus viverra nisi, vitae lacinia nulla lorem vel metus. Phasellus quis est ac tortor.'};
var blogs = {0:  blogZero, 1: blogOne, 2: blogTwo};

var BloggClient = {
    /*get: function () {
        return new Promise(function (resolve, reject) {
            request
                .get('api/Blogg')
                .on('error', requestHandler.error(reject))
                .end(function(err, res){
                	requestHandler.response(resolve, reject, err, res)
                });
        })
    }*/
    getBlog: function (id) {
        return blogs[id];
    },
    getAllBlogs: function () {
        return blogs;
    }
};

module.exports = BloggClient;