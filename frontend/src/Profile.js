import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AccountCircle, ExitToApp, ArrowForward, ListAlt, Bookmark } from '@material-ui/icons';
import { List, ListItem, ListItemText, Modal, IconButton } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { Remove as RemoveIcon, Close as CloseIcon } from '@material-ui/icons';
const useStyles = makeStyles(() => ({ appBar: { background: 'linear-gradient(45deg, #5dc4d6 30%, #d66fc8 90%)' } }));
function Profile() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [age, setAge] = useState("");
  const [phno, setPhno] = useState("");
  const [following, setFollowing] = useState("");
  const [followers, setFollowers] = useState("");
  const [edit, setEdit] = useState("false");
  const [follo, setFollo] = useState("false");
  const [foll, setFoll] = useState("false");
  useEffect(function () {
    {
      const fetchCredentials = async () => {
        // const username = localStorage.getItem('username');
        const response = await fetch(`/api/get-credentials/${username}`);
        const data = await response.json();
        if (response.ok) {
          const { fname, lname, email, age, phno, followers, following } = data;
          setFname(fname);
          setEmail(email);
          setAge(age);
          setLname(lname);
          setFollowers(followers);
          setFollowing(following);
          setUsername(localStorage.getItem('username'));
          setPhno(phno);
          // console.log(`FNAME: ${fname}, Email: ${email}`);
        } else {
          console.error(data.error);
        }
      };
      if (edit === "false") {
        fetchCredentials();
      }
    }
    /*eslint-disable-next-line*/
  }, []);
  function checkb() {
    navigate('/savedposts');
  }
  console.log(fname)
  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/');
  }
  function check() {
    navigate('/mysubgreddits');
  }
  function followerlist() {
    setFoll("true")
  }
  function followinglist() {
    setFollo("true")
  }
  function checka() {
    navigate('/allsubgreddits');
  }
  function handleClose() {
    setFollo("false")
  }
  function handleClose2() {
    setFoll("false")
  }
  function preedits() {
    setEdit("true");
  }
  function edits() {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch("/api/edit-credentials", {
        method: 'POST',
        body: JSON.stringify({
          "fname": fname,
          "lname": lname,
          "username": username,
          "email": email,
          "age": age,
          "phno": phno,
          "oldusername": localStorage.getItem('username')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        console.log("YES")
      }
      else {
        console.log("wraekjf")
      }
      setEdit("false");
    }

    fetchdata();
  }
  function handlefollowers(name) {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/unfollowing', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "following": name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      // console.log(props.id)
      if (response.ok) {
        var temparr = []
        following.map((elem) => {
          if (elem != name) {
            temparr.push(elem)
          }
        })
        setFollowing(temparr)
      }
    }
    fetchdata();
    const fetchdata2 = async () => {
      console.log("this")
      const response = await fetch('/api/unfollower', {
        method: 'POST',
        body: JSON.stringify({
          "username": name,
          "follower": localStorage.getItem('username'),
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      // console.log(props.id)
      if (response.ok) {
        var temparr = []
        followers.map((elem) => {
          if (elem != name) {
            temparr.push(elem)
          }
        })
        setFollowers(temparr)
      }
    }
    fetchdata2();
  }
  function handlefoll(name) {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/unfollower', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "follower": name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      // console.log(props.id)
      if (response.ok) {
        var temparr = []
        followers.map((elem) => {
          if (elem != name) {
            temparr.push(elem)
          }
        })
        setFollowers(temparr)
      }
    }
    fetchdata();

    const fetchdata2 = async () => {
      console.log("this")
      const response = await fetch('/api/unfollowing', {
        method: 'POST',
        body: JSON.stringify({
          "username": name,
          "following": localStorage.getItem('username')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      // console.log(props.id)
      if (response.ok) {
        var temparr = []
        following.map((elem) => {
          if (elem != name) {
            temparr.push(elem)
          }
        })
        setFollowing(temparr)
      }
    }
    fetchdata2();
  }
  if (localStorage.getItem('username') && localStorage.getItem('password'))
    return (
      <div className='profile'>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid container alignItems="flex-start" justify="flex-start">
              <Grid item>
                <Button color="inherit" endIcon={<AccountCircle />}>
                  Profile
                </Button>
                <Button color="inherit" endIcon={<ArrowForward />} onClick={check}>
                  MySubgreddits
                </Button>
                <Button color="inherit" endIcon={<ListAlt />} onClick={checka}>
                  Allsubgreddits
                </Button>
                <Button color="inherit" endIcon={<Bookmark />} onClick={checkb}>
                  SavedPosts
                </Button>
              </Grid>
            </Grid>
            <Button color="inherit" endIcon={<ExitToApp />} onClick={logout}>
              Logout
            </Button>          </Toolbar>
        </AppBar>
        <h1>PROFILE</h1>
        <div className='profile-box'>
          <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-female-circle-pink-512.png" alt="Italian Trulli" width="80" height="80" />
          <br />
          <br />
          <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>First Name<div style={{ fontStyle: "inherit", fontWeight: "lighter" }}>{fname}</div></div>
          <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Last Name<div style={{ fontStyle: "inherit", fontWeight: "lighter" }}>{lname}</div></div>
          <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Email<div style={{ fontStyle: "inherit", fontWeight: "lighter" }}>{email}</div></div>
          {/* <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Username<div style={{ fontStyle: "inherit", fontWeight: "lighter" }}>{username}</div></div> */}
          <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Contact<div style={{ fontStyle: "inherit", fontWeight: "lighter" }}>{phno}</div></div>
          <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Age<div style={{ fontStyle: "inherit", fontWeight: "lighter" }}>{age}</div></div>
          <div className='follow'>
            <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Followers : <button onClick={followerlist}>{followers.length}</button></div>
            <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Following : < button onClick={followinglist}>{following.length}</button></div>
          </div>
          <br />
          {edit === "true" &&
            <div>
              <input
                className="input-field"
                placeholder="Enter FirstName"
                value={fname}
                type="text"
                onChange={(e) => { setFname(e.target.value) }}
              />
              <input
                className="input-field"
                placeholder="Enter Lastname"
                value={lname}
                type="text"
                onChange={(e) => { setLname(e.target.value) }}
              />
              <input
                className="input-field"
                placeholder="Enter Mail"
                value={email}
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
              />
              {/* <input
                className="input-field"
                placeholder="Enter Username"
                value={username}
                type="text"
                onChange={(e) => { setUsername(e.target.value) }}
              /> */}
              <input
                className="input-field"
                placeholder="Enter Age"
                value={age}
                type="number"
                onChange={(e) => { setAge(e.target.value) }}
              />
              <input
                className="input-field"
                placeholder="Enter ContactNo"
                value={phno}
                type="text"
                onChange={(e) => { setPhno(e.target.value) }}
              />
              <br />
              <div className="save">
                <button type="save" onClick={edits}>SAVE</button>
              </div>
            </div>
          }
          {console.log(following)}

          {follo === "true" &&
            <div>
              <Modal open={follo}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '16px', borderRadius: '4px' }}>
                  <IconButton edge="start" color="secondary" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <List>
                    {following.map((name) => (
                      <ListItem key={name}>
                        <ListItemText primary={name} />
                        <IconButton edge="end" aria-label="remove" onClick={() => handlefollowers(name)}>
                          <RemoveIcon></RemoveIcon>
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Modal>
            </div>
          }
          {foll === "true" &&
            <div>
              <Modal open={foll}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '16px', borderRadius: '4px' }}>
                  <IconButton edge="start" color="secondary" onClick={handleClose2} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <List>
                    {followers.map((name) => (
                      <ListItem key={name}>
                        <ListItemText primary={name} />
                        <IconButton edge="end" aria-label="remove" onClick={() => handlefoll(name)}>
                          <RemoveIcon></RemoveIcon>
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Modal>
            </div>
          }
          <div className="edit">
            <button type="submit" onClick={preedits}>EDIT</button>
          </div>
        </div>

      </div>

    );
  else {
    window.location = "/";
  }
}
export default Profile;