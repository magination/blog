var Post = require('../models/post');
var User = require('../models/user');
var mongoose = require('mongoose');

var initUser = new User({username:'test', password:'test', fullname:'Riberull'});
var bigBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
Sed hendrerit nisl vitae venenatis congue. Aliquam erat volutpat. \
Vestibulum ac dapibus odio. Nunc non diam pulvinar, efficitur turpis dignissim,\
gravida massa. Vivamus viverra convallis augue, non molestie quam efficitur sit \
amet. Nam facilisis dapibus arcu, a sagittis felis rhoncus at. Donec rutrum \
vitae lorem eget vestibulum. Aenean at fringilla dui. Phasellus eu est cursus, \
tempor quam non, egestas nunc. In hac habitasse platea dictumst. In gravida \
lectus et dictum maximus. Sed in ex molestie, laoreet orci eu, aliquet velit. \
Aliquam vel massa nec ligula suscipit consectetur non quis augue. Donec sem \
ante, convallis vitae imperdiet ac, porttitor sit amet nulla. Aenean augue \
enim, fringilla in nibh scelerisque, vehicula hendrerit augue. Sed lectus \
est, posuere in finibus aliquet, interdum a tortor. Morbi luctus ipsum ac est \
fringilla, eget gravida eros cursus. Mauris venenatis, justo sit amet \
hendrerit congue, mi nisl sagittis purus, vel mattis tortor urna eu ipsum. \
Nulla id purus tincidunt, eleifend enim id, convallis libero. Donec \
condimentum erat nisl, at commodo mauris convallis nec. Nullam pellentesque \
quis mi at ornare. Duis sapien lacus, blandit nec congue vel, fermentum \
maximus neque. Fusce ipsum nulla, mollis eget pellentesque eget, volutpat a \
diam. Fusce a massa ante. Duis dignissim, purus ac congue sollicitudin, \
tellus dui blandit diam, ut tempor felis ante vel sem. Cum sociis natoque \
penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam \
ut rutrum lorem, at laoreet ipsum. Nullam vel convallis justo. Mauris viverra \
feugiat lectus nec aliquet. Nulla iaculis nec dolor nec ornare. Nam vitae \
libero vitae elit bibendum consectetur ac ut lectus. In fringilla ligula a \
dignissim laoreet. In dui tellus, tincidunt id mauris lacinia, consequat \
blandit lorem. Praesent mollis, nunc cursus molestie porttitor, orci nunc \
vestibulum lectus, id convallis dui ligula sit amet urna. Maecenas ut \
imperdiet lacus, a sodales diam. Curabitur mollis luctus aliquet. Sed aliquet, \
lorem et rutrum volutpat, lacus erat laoreet nulla, sit amet suscipit mauris \
eros ut elit. Cras laoreet ipsum sit amet enim congue, sed ultrices ligula \
congue.";

var initPosts = [
  {
    title:'testpost1-title',
    body: 'testpost1-body',
    author: initUser
  },
  {
    title:'testpost2-title',
    body: 'testpost2-body',
    author: initUser
  },
  {
    title:'testpost3-title',
    body: 'testpost3-body',
    author: initUser
  },
  {
    title:'testpost4-title',
    body: 'testpost4-body',
    author: initUser
  },
  {
    title:'testpost5-title',
    body: bigBody,
    author: initUser
  },
];

Post.find().exec(function (err, posts){
    if (posts.length == 0){
      Post.create(initPosts, function (err) {
        if(err) return console.log(err);
        console.log('Created initial posts');
      })
    }
});
User.find().exec(function (err, user){
  if (user.length == 0){
    initUser.save(function(err, user){
      if(err) return console.log(err);
      console.log('Created initial user');
    });
  };
});
