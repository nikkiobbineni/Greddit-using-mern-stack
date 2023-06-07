import './Card.css'
import { useParams } from "react-router-dom";
// import '/Log_in.css'
import React from 'react';
import { useState, useEffect } from 'react';
const Card = (props) => {
  // console.log(props.name);
  const { gredditname } = useParams();
  let x = []
  const [addcomment, setAddcomment] = useState("false")
  const [newcomment, setNewcomment] = useState("")
  const [joins, setJoins] = useState("true")
  const [report, setReport] = useState("false")
  const [concern, setConcern] = useState("")
  const [xyz, setXyz] = useState(props.comments)
  function saves() {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/add-posting', {
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

    }
    else
    {
      alert(data.error)
    }
      console.log(props.id)
    }
    fetchdata();
  }
  function reporta() {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/add-report', {
        method: 'POST',
        body: JSON.stringify({
          "name": gredditname,
          "reportedby": localStorage.getItem('username'),
          "reportedon": props.postedby,
          "concern": concern,
          "text": props.text,
          "myid": props.id,
          "ignore": false,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        setReport("false");
      }
      else {
        alert(data.error)
        setReport("false");
      }
    }
    fetchdata();
    // setReport("false");
  }
  function follow2() {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/follower', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "following": props.postedby
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log(props.id)
      if (response.ok) {

      }
      else {
        const fetchdata2 = async () => {
          console.log("this")
          const response = await fetch('/api/unfollowing', {
            method: 'POST',
            body: JSON.stringify({
              "username": localStorage.getItem('username'),
              "following": props.postedby
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json();
        }
        fetchdata2();
        alert(data.error)
      }
    }
    fetchdata();
  }
  function follow() {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/following', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "following": props.postedby
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        follow2();
      }
      else {
        alert(data.error)
      }
      console.log(props.id)
    }
    fetchdata();
  }
  function check() {
    if (props.postedby === localStorage.getItem('username')) {
      setJoins("false");
    }
  }
  function checkb() {
    // if(props.postedby === localStorage.getItem('username'))
    {
      setJoins("true");
    }
  }
  function adds() {
    let x = [...props.comments, newcomment];
    setAddcomment("false");
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/edit-posts', {
        method: 'POST',
        body: JSON.stringify({
          "name": gredditname,
          "text": props.text,
          "postedby": props.postedby,
          "postedin": props.postedin,
          "comments": x,
          "upvotes": props.upvotes,
          "downvotes": props.downvotes,
          "join": false,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        setXyz([
          ...xyz,
          newcomment
        ])
      }
    }
    fetchdata();
  }
  function adding() {
    setAddcomment("true");
  }
  function reporting() {
    setReport("true");
  }
  return (
    <div className="card">
      <div className="card-content">
        <h2>Text: {props.text}</h2>
        <p>Postedby: {props.postedby}</p>
        <p>Postedin: {props.postedin}</p>
        <p>Comments : {xyz}</p>
        <p>Upvotes : {props.upvotes}</p>
        <p>Downvotes : {props.downvotes}</p>
        <button onClick={props.onLike}>Upvote</button>
        <button onClick={props.onDislike}>Downvote</button>
        <button onClick={adding}>Add Comment</button>
        <button onClick={saves}>Save post</button>
        <button onClick={follow}>Follow user</button>
        <button onClick={reporting}>Report post</button>
        {/* {props.po === "true" &&
          <button >Join</button>
        } */}
        {addcomment === "true" &&
          <div className="login-box">
            <div className="h2">
              <h2>NEW COMMENT</h2>
            </div>
            <label>
              <br />
              <input
                className="input-field"
                placeholder="Command"
                type="text"
                value={newcomment}
                onChange={(e) => { setNewcomment(e.target.value); }}
              />
            </label>
            <button className="save-button" type="submit" onClick={adds}>SAVE</button>
          </div>
        }
        {report === "true" &&
          <div className="login-box">
            <div className="h2">
              <h2>NEW REPORT</h2>
            </div>
            <label>
              <br />
              <input
                className="input-field"
                placeholder="Concern"
                type="text"
                value={concern}
                onChange={(e) => { setConcern(e.target.value); }}
              />
            </label>
            <button className="save-button" type="submit" onClick={reporta}>REPORT</button>
          </div>
        }
      </div>
    </div>
  );
};
export default Card;
