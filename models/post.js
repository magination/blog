var mongoose = require('mongoose');
var baucis = require('baucis');


var postSchema = new mongoose.Schema({
  title: {type:String, required:true},
  body: {type:String, required:true},
  slug: {type:String, required:true, unique: true},
  author: { type:mongoose.Schema.Types.ObjectId, required:true, ref:'user'}
})

module.exports = mongoose.model('post', postSchema);
