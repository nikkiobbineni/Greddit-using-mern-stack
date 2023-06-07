import './Card.css'
// import { useParams } from "react-router-dom";
import React from 'react';
// import { useState, useEffect } from 'react';
const Card = (props) => {
  function unsave() {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/delete-posting', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "savedposts": props.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if(response.ok)
      {
        const x = []
        props.masterarrt.map((post)=>{
          if(post != props.text)
          {
            x.push(post)
          }
        })
        console.log("lol")
        console.log(x)
        props.setMasterarrt(x)
      }
      // console.log(props.id)
    }
    fetchdata();
  }
  return (
    <div className="card">
      <div className="card-content">
        <h2>Text: {props.text}</h2>
        <p>Postedby: {props.postedby}</p>
        <p>Postedin: {props.postedin}</p>
        <p>Comments : {props.comments}</p>
        <p>Upvotes : {props.upvotes}</p>
        <p>Downvotes : {props.downvotes}</p>
        <button onClick={unsave}>Unsave</button>
      </div>
    </div>
  );
};
export default Card;
