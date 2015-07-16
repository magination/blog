var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) return done(null, false, 'Incorrect username');
      user.validPassword(password, user.password)
        .then(done(null,user))
        .catch(function(err){
          res.send(err);
        });
    });
  }
));

/*module.exports = function(req, res, next){
  passport.authenticate('local', function(err, user){
      if(err) return res.send(err);
      req.logIn(user,next);
  })(req,res,next);
};*/
