import './Log_in.css';
import Card from './Card.js';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AccountCircle, ExitToApp, ArrowForward,ListAlt,Bookmark } from '@material-ui/icons';
const useStyles = makeStyles(() => ({ appBar: { background: 'linear-gradient(45deg, #5dc4d6 30%, #d66fc8 90%)' } }));
function Mysubgreddits() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [pqr, setPqr] = useState("false");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [name, setName] = useState("");
  const [masterarrj, setMasterarrj] = useState()
  var arrn = [];
  var arrd = [];
  var arrt = [];
  var arrk = [];
  var arrj = [];
  const [masterarrn, setMasterarrn] = useState()
  const [masterarrd, setMasterarrd] = useState()
  const [masterarrt, setMasterarrt] = useState()
  const [masterarrk, setMasterarrk] = useState()
  const [bannedwords, setBannedwords] = useState("");
  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/');
  }
  function check() {
    navigate('/profile');
  }
  function checka() {
    navigate('/allsubgreddits');
  }
  function addgreddits() {
    setPqr("true")
  }
  function opens(name) {
    navigate(`/mysubgreddits/${name}`);
  }
  function deletes(name) {
    const fetchdata = async () => {
      console.log("this")
      await fetch(`/api/delete-credentials/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    fetchdata();
    console.log(masterarrn)
    const temparr = []
    masterarrn.map((elem) => {
      if (elem != name) {
        temparr.push(elem)
      }
    })
    // masterarrn.pop(name)
    // console.log(temparr)
    setMasterarrn(temparr)
    // console.log(masterarrn)
  }
  function checkb() {
    navigate('/savedposts');
  }
  useEffect(function () {
    const fetchCredentials = async () => {
      const username = localStorage.getItem('username');
      const response = await fetch(`/api/get-subgreddits/${username}`);
      const data = await response.json();
      // console.log(data)
      if (response.ok) {
        const { name } = data.map((e) => (
          arrn.push(e.name)
        ));
        setMasterarrn(arrn)
        console.log(masterarrn)
        const { description } = data.map((e) => (
          arrd.push(e.description)
        ));
        setMasterarrd(arrd)
        console.log(masterarrd)
        const { tags } = data.map((e) => (
          arrt.push(e.tags)
        ));
        setMasterarrt(arrt)
        const { bannedwords } = data.map((e) => (
          arrk.push(e.bannedwords)
        ));
        setMasterarrk(arrk)
        const { joinedusers } = data.map((e) => (
          arrj.push(e.joinedusers)
        ));
        // arrj.push(localStorage.getItem('username'))
        setMasterarrj(arrj)
        arrd = []
        arrn = []
        arrk = []
        arrt = []
        arrj = []

      }
      else {
        console.error(data.error);
      }
    };
    if (pqr === "false") {
      fetchCredentials();
    }
    /*eslint-disable-next-line*/
  }, []);
  function reset() {
    const fetchdata = async () => {
      const response = await fetch('/api/add-subgreddits', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "name": name,
          "description": description,
          "tags": tags,
          "bannedwords": bannedwords,
          "joinedusers": [localStorage.getItem('username')],
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        console.log("YES")
        setMasterarrn([
          ...masterarrn,
          name
        ])
        setMasterarrd([
          ...masterarrd,
          description
        ])
        setMasterarrt([
          ...masterarrt,
          tags
        ])
        setMasterarrk([
          ...masterarrk,
          bannedwords
        ])
        setMasterarrj([
          ...masterarrj,
          [localStorage.getItem('username')]
        ])
      }
      else {
        console.log("No")
      }
    }
    fetchdata();
    setPqr("false")
  }
  return (
    <div>
      {/* {
        console.log("masterarrn")
      }
      {console.log(masterarrn)} */}
      <div >
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid container alignItems="flex-start" justify="flex-start">
              <Grid item>
                <Button color="inherit" onClick={check} endIcon={<AccountCircle />}>
                  Profile
                </Button>
                <Button color="inherit" endIcon={<ArrowForward />}>
                  MySubgreddits
                </Button>
                <Button color="inherit" endIcon={<ListAlt />} onClick={checka}>
                  Allsubgreddits
                </Button>
                <Button color="inherit"  endIcon={<Bookmark />} onClick={checkb}>Savedposts</Button>
              </Grid>
            </Grid>
            <Button color="inherit" endIcon={<ExitToApp />} onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className='bg'>
        <div className='card-container'>
          {masterarrn && masterarrn.map((name, index) => (
            <Card
              name={name}
              description={masterarrd[index]}
              tags={masterarrt[index]}
              bannedkeywords={masterarrk[index]}
              joinedusers={masterarrj[index]}
              onDelete={(e) => { e.preventDefault(); deletes(name) }}
              onOpen={() => opens(name)}
            />
          ))}
        </div>
        <div className='login-containera'>
          <button className="add-button" type="submit" onClick={addgreddits}>ADD</button>
          {pqr === "true" &&
            <div className="login-box">
              <div className="h2">
                <h2>NEW SUB GREDDIT</h2>
              </div>
              <label>
                <br />
                <input
                  className="input-field"
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); }}
                />
              </label>
              <label>
                <br />
                <input
                  className="input-field"
                  placeholder="Description"
                  type="text"
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); }}
                />
              </label>
              <label>
                <br />
                <input
                  className="input-field"
                  placeholder="Tags"
                  type="text"
                  value={tags}
                  onChange={(e) => { setTags(e.target.value); }}
                />
              </label>
              <label>
                <br />
                <input
                  className="input-field"
                  placeholder="Banned Keywords"
                  type="text"
                  value={bannedwords}
                  onChange={(e) => { setBannedwords(e.target.value); }}
                />
              </label>
              <button className="save-button" type="submit" onClick={reset} disabled={!bannedwords || !tags || !name || !description}>SAVE</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default Mysubgreddits;