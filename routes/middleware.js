

module.exports.requireUser = function(req,res,next){
  if(!req.user) {
    res.status(401);
    return res.send({message: 'Unauthorized, please log in', status: 401});
  }
  next();
};
