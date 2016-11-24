const User = require('../modals/user');
const jwt = require("jwt-simple");
const config = require("../config");

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({sub:user.id,iat:timestamp},config.secret);
}

exports.signin = function(req,res,next){

  res.send({token:tokenForUser(req.user)})
}



exports.signup=function(req,res,next){
const email = req.body.email;
const password = req.body.password;

if(!email || !password){
return res.status(422).send({error:"your must provide email and password"});

}
//see if a user with given email exists
User.findOne({email:email},function(err,existingUser){

  if(err){return next(err);}

  if(existingUser){
    return res.status(422).send({error:"Email is in use"});
  }

})
//if a user with email exist, return an error
  const user= new User({
  email:email,
  password:password

  });
//if no user exist, create and save user record and we will respond to request
user.save(function(err){
if(err){
  return next(err);
}

res.json({token:tokenForUser(user)});

});
}
