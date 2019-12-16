const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path=require('path');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/api',(req,res)=>{
  res.status(200).json({message:"Welcome to the API"});
  }
)
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
// Static file declaration:
server.use(express.static(path.join(__dirname, "client/build")));
//production mode:
if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "client/build")));
  server.get("*", (req, res) => {
    res.sendFile(path.join((__dirname = "client/build/index.html")));
  });
}
//BUild Mode:
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});
module.exports = server;
