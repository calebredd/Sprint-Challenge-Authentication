const router = require('express').Router();
const Users=require('../database/dbHelper.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secrets=require('../config/secrets.js');

router.get('/register', (req, res) => {
  res.status(200).send("Welcome to the register page");

});

router.get('/login', (req, res) => {
  res.status(200).send("Welcome to the login page");

});

router.get('/:userId',(req,res)=>{
  Users.findById(req.params.userId).then(user=>{
    if(user){
      res.status(200).json(user);
    }else{
      res.status(500).json({errorMessage:"That user does not exist!"});
    }
  }).catch(err=>{
    res.status(500).json({errorMessage:"Unable to access that user"});
  })
})

router.post('/register', (req, res) => {
  // implement registration
const {username, password}=req.headers;
const user={username};
const hash=bcrypt.hashSync(password,10);
user.password=hash;
Users.insert(user)
.then(saved=>{
  const token=genToken(user);
  res.status(201).json({saved, token});
})
.catch(err=>{
  res.status(500).json({errorMessage:"Unable to add user to the Database"})
})


});

router.post('/login', (req, res) => {
  // implement login
  const {username, password}=req.headers;

  Users.findBy({username}).first().then(user=>{
    if(user&& bcrypt.compareSync(password, user.password)){
      const token=genToken(user);
      res.status(200).json({
        message:`Welcome back ${user.username}!`,
        token:token
      });
    }
    else{
      res.status(401).json({message:"You shall not pass!"});
    }
  }).catch(err=>{
    res.status(500).json({message:"Inaccessible!"})
  });
});

module.exports = router;

function genToken(user){
  const payload={
    userid:user.id,
    username:user.username
  };
  const options={expiresIn:"1h"};
  const token=jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}
