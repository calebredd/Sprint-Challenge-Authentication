import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from "axios";
import Jokes from "./components/Jokes.js";
function App() {
  const [jokes, setJokes]=useState([]);
  useEffect(()=>{
    // axios.post('/api/auth/login',{headers:{"username":"Mikey","password":"password"}}).then(res=>{
    //   console.log(res.data);
    // }).catch(err=>{
    //   console.error(err);
    // })
    axios
    .get('/api/jokes',{headers:{"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjMsInVzZXJuYW1lIjoiTWlrZXkiLCJpYXQiOjE1NzY0NzE2MzcsImV4cCI6MTU3NjQ3NTIzN30.lxUe-Rl7hYl8Oih6cA9THc61pI_xvRrSgKgb0y_ueeA"}})
    .then(res=>{
      console.log(res.data);
      setJokes(res.data);
    })
    .catch(err=>{
      console.error(err);
    });
  },[]);
// console.log(jokes);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dad Jokes</h1>
      </header>
      <div className="main-content">
        <Jokes jokes={jokes} setJokes={setJokes}/>
      </div>
    </div>
  );
}

export default App;
