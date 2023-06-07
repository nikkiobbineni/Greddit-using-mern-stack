import './Card.css'
import { useParams } from "react-router-dom";
import React from 'react';
import { IconButton } from '@material-ui/core';
import { OpenInBrowser } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
const Card = (props) => {
  const { gredditname } = useParams();
  console.log(props.name);
  console.log("wkdjwe")
  var arrt = []
  const [post, setPost] = useState(0);
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
        <p>Number of users: {props.joinedusers.length }</p>
        {postcount(props.name)}
        <p>Number of posts : {post}</p>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton style={{ background: 'linear-gradient(135deg,#69cddf,#a03c93)', color: '#FFFFFF', boxShadow: 'none' }} size="small" onClick={props.onOpen}>
              <OpenInBrowser />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton style={{ background: 'linear-gradient(135deg,#69cddf,#a03c93)', color: '#FFFFFF', boxShadow: 'none' }} size="small" onClick={props.onDelete}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Card;
