import './Card.css'
import React from 'react';
import { useState, useEffect } from 'react';
const Card = (props) => {
  var arrt = []
  const [isjoined, setIsjoined] = useState(false)
  useEffect(() => {
    setIsjoined(props.joinedusers.includes(localStorage.getItem('username')))
  }, []
  )
  const [post, setPost] = useState(0);
  function joinreq() {

    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/join-req', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "name": props.name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        //  setIsjoined(true)
      }
      else {
        alert(data.error)
      }
      console.log(props.id)
    }
    fetchdata();
  }
  function leavereq() {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/leave-req', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "name": props.name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        setIsjoined(false)
      }
      else {
        alert(data.error)
      }
      console.log(props.id)
    }
    fetchdata();
  }
  function postcount(gredditname) {
    console.log("njcsfd")
    const fetchCredentials = async () => {
      const response = await fetch(`/api/get-posts/${gredditname}`);
      const data = await response.json();
      if (response.ok) {
        const { text } = data.map((e) => (
          arrt.push(e.text)
        ));
        //    console.log(arrt.length) 
        setPost(arrt.length)
      }
    };
    fetchCredentials();
  }
  return (
    <div className="card">
      <div className="card-content">
        <p className="name">{props.name}</p>
        <p className="description">Description: {props.description}</p>
        <p className="tags">Tags: {props.tags}</p>
        <p className="banned-keywords">Banned Key words: {props.bannedkeywords}</p>
        <p>Number of users: {props.joinedusers.length}</p>
        {postcount(props.name)}
        <p>Number of posts : {post}</p>
        {/* {console.log(props.tags)} */}
        {isjoined &&
          <div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ backgroundColor: '#4a90e2', color: 'black', borderRadius: '5px', padding: '5px 15px' }} onClick={(e) => {
                  e.preventDefault()
                  console.log("yes")
                  console.log(props.blockusers)
                  if (props.blockusers.includes(localStorage.getItem('username'))) {
                    alert("You have been blocked")
                    return;
                  }
                  props.onOpen()
                }}>Open</button>
                {props.users.includes(localStorage.getItem('username')) &&
                  <button style={{ backgroundColor: '#9b9b9b', color: 'black', borderRadius: '5px', padding: '5px 15px' }} disabled={true}>Leave</button>
                }
                {!props.users.includes(localStorage.getItem('username')) &&
                  <button style={{ backgroundColor: '#9b9b9b', color: 'black', borderRadius: '5px', padding: '5px 15px' }} onClick={leavereq}>Leave</button>
                }
              </div>
            </div>

          </div>
        }
        {!isjoined &&
          <button style={{ backgroundColor: '#90EE90', color: 'black', borderRadius: '5px', padding: '5px 15px' }} onClick={joinreq}>Join</button>
        }
        {/* {!props.joinedusers.includes(localStorage.getItem('username')) && props.leftusers.includes(localStorage.getItem('username')) &&
          <button style={{ backgroundColor: '#90EE90', color: 'black', borderRadius: '5px', padding: '5px 15px' }} disabled={true}>Join</button>
        } */}
      </div>
    </div>
  );
};

export default Card;
