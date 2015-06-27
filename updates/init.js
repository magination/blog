var Post = require('../models/post');
var User = require('../models/user');
var mongoose = require('mongoose');

var initUser = new User({username:'test', password:'test'});

var initPosts = [
  {
    title:'testpost1-title',
    body: 'testpost1-body',
    slug: 'testpost1-title',
    author: initUser
  },
  {
    title:'testpost2-title',
    body: 'testpost2-body',
    slug: 'testpost2-title',
    author: initUser
  },
  {
    title:'testpost3-title',
    body: 'testpost3-body',
    slug: 'testpost3-title',
    author: initUser
  },
  {
    title:'testpost4-title',
    body: 'testpost4-body',
    slug: 'testpost4-title',
    author: initUser
  },
  {
    title:'testpost5-title',
    body: 'testpost5-body',
    slug: 'testpost5-title',
    author: initUser
  },
];

Post.find().exec(function (err, posts){
    if (posts.length == 0){
      Post.create(initPosts, function (err) {
        if(err) return console.log(err);
      })
      console.log('Created initial posts');
    }
});
User.find().exec(function (err, user){
  if (user.length == 0){
    initUser.save();
  };
});
