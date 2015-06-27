var mongoose = require('mongoose');
var baucis = require('baucis');


var postSchema = new mongoose.Schema({
  title: {type:String, required:true},
  body: {type:String, required:true},
  author: {type:mongoose.Schema.Types.ObjectId}
})

module.exports = mongoose.model('post', postSchema);
