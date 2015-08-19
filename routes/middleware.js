

module.exports.requireUser = function(req,res,next){
  if(!req.user) {
    res.status(401);
    return res.send('Unauthorized, please log in');
  }

  next();
};
