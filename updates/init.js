var Post = require('../models/Post');
var User = require('../models/User');
var mongoose = require('mongoose');

var initUser = new User({username:'test', password:'test'});

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
    body: 'testpost5-body',
    author: initUser
  },
];

Post.find().exec(function (err, posts){
    if (posts.length == 0){
      Post.create(initPosts);
      console.log('Created initial posts');
    }
});
User.find().exec(function (err, user){
  if (user.length == 0){
    initUser.save();
    console.log('Created initial user');
  };
});
