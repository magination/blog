var mongoose = require('mongoose');
var baucis = require('baucis');

var userSchema = new mongoose.Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
})

module.exports = mongoose.model('user', userSchema);
baucis.rest('user');
