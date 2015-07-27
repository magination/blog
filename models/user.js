var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
Promise.promisifyAll(bcrypt);
var userSchema = new mongoose.Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
  fullname: {type:String, required:true}
})

userSchema.pre('save', function(next){
  bcrypt.hash(this.password, 8, function(err, hash) {
    this.password = hash;
    next();
  }.bind(this));
});

userSchema.methods.validPassword = function(password){
    return bcrypt
      .compareAsync(password,this.password)
      .then(function(result, err) {
        if(err) throw new Error(err);
        return result;
  });
}

module.exports = mongoose.model('user', userSchema);
