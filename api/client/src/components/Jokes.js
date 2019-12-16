import React from 'react';
// import axios from "axios";
function Jokes(props) {
  const {jokes, setJokes}=props;
console.log(jokes[0]);
  return (
      <div className="main-content">
      {jokes.map(joke=>(
        <div key={joke.id}>
          <p>{joke.joke}</p>
        </div>
      ))}
      </div>
  );
}

export default Jokes;
