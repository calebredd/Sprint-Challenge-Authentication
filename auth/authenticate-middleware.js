/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt=require('bcryptjs'),
jwt=require('jsonwebtoken'),
secrets=require('../config/secrets.js');

module.exports = (req, res, next) => {
const token=req.headers.authorization;
if(token){
  jwt.verify(token, secrets.jwtSecret,(err, decodedToken)=>{
    if(err){
      res.status(401).json({you:'Shall not pass!'});
    }else{
      req.decodedJwt=decodedToken;
      next();
    }
  });
}else{
  res.status(401).json({ you: "can't touch that" });
};
};
