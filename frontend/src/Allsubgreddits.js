import './Log_in.css';
import Card from './Card3.js';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AccountCircle, ExitToApp, ArrowForward, ListAlt, Bookmark } from '@material-ui/icons';
const useStyles = makeStyles(() => ({ appBar: { background: 'linear-gradient(45deg, #5dc4d6 30%, #d66fc8 90%)' } }));
function Allsubgreddits() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [pqr, setPqr] = useState("false");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [name, setName] = useState("");
  const [joinedusers, setjoinedusers] = useState("")
  // const [post, setPost] = useState("");
  var arrn = [];
  var arrd = [];
  var arrt = [];
  var arrk = [];
  var arrj = [];
  var arrlu = [];
  var arruser = [];
  var arrct = [];
  var arrbu =[];
  const [masterarrn, setMasterarrn] = useState()
  const [masterarrd, setMasterarrd] = useState()
  const [masterarrt, setMasterarrt] = useState()
  const [masterarrk, setMasterarrk] = useState()
  const [masterarrj, setMasterarrj] = useState()
  const [masterarrbu, setMasterarrbu] = useState()
  const [masterarruser, setMasterarruser] = useState()
  const [masterarrct, setMasterarrct] = useState()
  const [masterarrlu, setMasterarrlu] = useState()
  const [bannedwords, setBannedwords] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchtag, setSearchtag] = useState("");

  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/');
  }
  function check() {
    navigate('/profile');
  }
  function checkb() {
    navigate('/savedposts');
  }
  function checka() {
    navigate('/mysubgreddits');
  }
  function addgreddits() {
    setPqr("true")
  }
  useEffect(function () {
    const fetchCredentials = async () => {
      // const username = localStorage.getItem('username');
      const response = await fetch(`/api/get-allsubgreddits`);
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
        const { users } = data.map((e) => (
          arruser.push(e.username)
        ));
        setMasterarruser(arruser)
        const { creationtime } = data.map((e) => (
          arrct.push(e.createdAt)
        ));
        setMasterarrct(arrct)
        const { blockedusers } = data.map((e) => (
          arrbu.push(e.blockedusers)
        ));
        setMasterarrbu(arrbu)
        const { leftusers } = data.map((e) => (
          arrlu.push(e.leftusers)
        ));
        setMasterarrlu(arrlu)
        // console.log(arrct)
        arrd = []
        arrn = []
        arrk = []
        arrt = []
        arrj = []
        arruser = []
        arrct = []
        arrlu = []
        arrbu =[]
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
  console.log(masterarrj)
  function opens(name) {
    navigate(`/allsubgreddits/${name}`);
  }
  function reset() {
    const fetchdata = async () => {
      const response = await fetch('/api/add-subgreddits/', {
        method: 'POST',
        body: JSON.stringify({
          "username": localStorage.getItem('username'),
          "name": name,
          "description": description,
          "tags": tags,
          "bannedwords": bannedwords,
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
      }
      else {
        console.log("No")
      }
    }
    fetchdata();
    setPqr("false")
  }
  function ascending() {
    const arrnCopy = [...masterarrn];
    const arrdCopy = [...masterarrd];
    const arruserCopy = [...masterarruser];
    const arrtCopy = [...masterarrt];
    const arrkCopy = [...masterarrk];
    const arrjCopy = [...masterarrj];
    const data = arrnCopy.map((value, index) => ({ value, index }));
    data.sort((a, b) => a.value.localeCompare(b.value));

    // update arrnCopy with sorted values
    const sortedArrn = data.map(item => item.value);
    arrnCopy.length = 0;
    arrnCopy.push(...sortedArrn);

    // update arrdCopy, arruserCopy, arrtCopy, arrkCopy, and arrjCopy based on sorted indices
    const sortedIndices = data.map(item => item.index);
    const sortedArrd = sortedIndices.map(index => arrdCopy[index]);
    const sortedArruser = sortedIndices.map(index => arruserCopy[index]);
    const sortedArrt = sortedIndices.map(index => arrtCopy[index]);
    const sortedArrk = sortedIndices.map(index => arrkCopy[index]);
    const sortedArrj = sortedIndices.map(index => arrjCopy[index]);

    // set state with updated arrays
    setMasterarrn(arrnCopy);
    setMasterarrd(sortedArrd);
    setMasterarruser(sortedArruser);
    setMasterarrt(sortedArrt);
    setMasterarrk(sortedArrk);
    setMasterarrj(sortedArrj);
  }
  function descending() {
    // create copies of all the arrays
    const arrnCopy = [...masterarrn];
    const arrdCopy = [...masterarrd];
    const arruserCopy = [...masterarruser];
    const arrtCopy = [...masterarrt];
    const arrkCopy = [...masterarrk];
    const arrjCopy = [...masterarrj];

    // create an array of objects, where each object contains the value and index of the corresponding element in arrnCopy
    const data = arrnCopy.map((value, index) => ({ value, index }));

    // sort the data array based on values (for arrnCopy)
    data.sort((a, b) => b.value.localeCompare(a.value));

    // update arrnCopy with sorted values
    const sortedArrn = data.map(item => item.value);
    arrnCopy.length = 0;
    arrnCopy.push(...sortedArrn);

    // update arrdCopy, arruserCopy, arrtCopy, arrkCopy, and arrjCopy based on sorted indices
    const sortedIndices = data.map(item => item.index);
    const sortedArrd = sortedIndices.map(index => arrdCopy[index]);
    const sortedArruser = sortedIndices.map(index => arruserCopy[index]);
    const sortedArrt = sortedIndices.map(index => arrtCopy[index]);
    const sortedArrk = sortedIndices.map(index => arrkCopy[index]);
    const sortedArrj = sortedIndices.map(index => arrjCopy[index]);

    // set state with updated arrays
    setMasterarrn(arrnCopy);
    setMasterarrd(sortedArrd);
    setMasterarruser(sortedArruser);
    setMasterarrt(sortedArrt);
    setMasterarrk(sortedArrk);
    setMasterarrj(sortedArrj);
  }
  function sortByFollowers() {
    const arrnCopy = [...masterarrn];
    const arrdCopy = [...masterarrd];
    const arruserCopy = [...masterarruser];
    const arrtCopy = [...masterarrt];
    const arrkCopy = [...masterarrk];
    const arrjCopy = [...masterarrj];

    const data = arrjCopy.map((value, index) => ({ value, index }));

    data.sort((a, b) => b.value.length - a.value.length);

    const sortedIndices = data.map(item => item.index);
    const sortedArrn = sortedIndices.map(index => arrnCopy[index]);
    const sortedArrd = sortedIndices.map(index => arrdCopy[index]);
    const sortedArruser = sortedIndices.map(index => arruserCopy[index]);
    const sortedArrt = sortedIndices.map(index => arrtCopy[index]);
    const sortedArrk = sortedIndices.map(index => arrkCopy[index]);
    const sortedArrj = sortedIndices.map(index => arrjCopy[index]);

    setMasterarrn(sortedArrn);
    setMasterarrd(sortedArrd);
    setMasterarruser(sortedArruser);
    setMasterarrt(sortedArrt);
    setMasterarrk(sortedArrk);
    setMasterarrj(sortedArrj);
  }
  function sortByCreation() {
    const arrnCopy = [...masterarrn];
    const arrdCopy = [...masterarrd];
    const arruserCopy = [...masterarruser];
    const arrtCopy = [...masterarrt];
    const arrkCopy = [...masterarrk];
    const arrjCopy = [...masterarrj];
    const arrctCopy = [...masterarrct];
    console.log(arrctCopy)
    const data = arrctCopy.map((value, index) => ({ value, index }));
    data.sort((a, b) => new Date(b.value) - new Date(a.value));
    const sortedIndices = data.map(item => item.index);
    const sortedArrn = sortedIndices.map(index => arrnCopy[index]);
    const sortedArrd = sortedIndices.map(index => arrdCopy[index]);
    const sortedArruser = sortedIndices.map(index => arruserCopy[index]);
    const sortedArrt = sortedIndices.map(index => arrtCopy[index]);
    const sortedArrk = sortedIndices.map(index => arrkCopy[index]);
    const sortedArrj = sortedIndices.map(index => arrjCopy[index]);
    const sortedArrct = sortedIndices.map(index => arrctCopy[index]);

    setMasterarrn(sortedArrn);
    setMasterarrd(sortedArrd);
    setMasterarruser(sortedArruser);
    setMasterarrt(sortedArrt);
    setMasterarrk(sortedArrk);
    setMasterarrj(sortedArrj);
    setMasterarrct(sortedArrct);
  }
  return (
    <div>
      {console.log(arrn)}
      <div >
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid container alignItems="flex-start" justify="flex-start">
              <Grid item>
                {/* <Button color="inherit" onClick={check}>Profile</Button> */}
                <Button color="inherit" onClick={check} endIcon={<AccountCircle />}>
                  Profile
                </Button>
                <Button color="inherit" endIcon={<ArrowForward />} onClick={checka}>
                  MySubgreddits
                </Button>
                <Button color="inherit" endIcon={<ListAlt />}>
                  Allsubgreddits
                </Button>
                <Button color="inherit" endIcon={<Bookmark />} onClick={checkb}>Savedposts</Button>
              </Grid>
            </Grid>
            <Button color="inherit" endIcon={<ExitToApp />} onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className='bg'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='search-bar' style={{ display: 'flex', alignItems: 'center', borderRadius: '5px', overflow: 'hidden', background: 'linear-gradient(to right, #a7e9f9, #fad0c4)', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '30%' }}>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." style={{ flex: 1, border: 'none', outline: 'none', padding: '10px', background: 'none' }} />
          </div>
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='search-bar' style={{ display: 'flex', alignItems: 'center', borderRadius: '5px', overflow: 'hidden', background: 'linear-gradient(to right, #a7e9f9, #fad0c4)', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '30%' }}>
            <input type="text" value={searchtag} onChange={(e) => setSearchtag(e.target.value)} placeholder="Search tags..." style={{ flex: 1, border: 'none', outline: 'none', padding: '10px', background: 'none' }} />
          </div>
        </div>

        <br />
        <button onClick={ascending}>ASCENDING</button>
        <button onClick={descending}>DECENDING</button>
        <button onClick={sortByFollowers}>FOLLOWERS</button>
        <button onClick={sortByCreation}>CREATIONTIME</button>
        <div className='card-container'>
          {masterarrn && masterarrn.map((name, index) => {
            if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return null;
            }
            if (searchtag) {
              const tags = masterarrt[index].split(',').map(tag => tag.trim());
              const searchTags = searchtag.split(',').map(tag => tag.trim());
              if (!searchTags.some(tag => tags.includes(tag))) {
                return null;
              }
            }

            if (masterarruser[index] === localStorage.getItem('username'))
              return (
                <Card
                  name={name}
                  description={masterarrd[index]}
                  tags={masterarrt[index]}
                  bannedkeywords={masterarrk[index]}
                  joinedusers={masterarrj[index]}
                  users={masterarruser[index]}
                  leftusers={masterarrlu[index]}
                  blockusers={masterarrbu[index]}
                  onOpen={() => opens(name)}
                />
              );
          })}
          {masterarrn && masterarrn.map((name, index) => {
            if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return null;
            }
            if (searchtag) {
              const tags = masterarrt[index].split(',').map(tag => tag.trim());
              const searchTags = searchtag.split(',').map(tag => tag.trim());
              if (!searchTags.some(tag => tags.includes(tag))) {
                return null;
              }
            }
            if (masterarruser[index] !== localStorage.getItem('username') && masterarrj[index].includes(localStorage.getItem('username')))
              return (
                <Card
                  name={name}
                  description={masterarrd[index]}
                  tags={masterarrt[index]}
                  bannedkeywords={masterarrk[index]}
                  joinedusers={masterarrj[index]}
                  users={masterarruser[index]}
                  leftusers={masterarrlu[index]}
                  blockusers={masterarrbu[index]}
                  onOpen={() => opens(name)}
                />
              );
          })}
          {masterarrn && masterarrn.map((name, index) => {
            if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return null;
            }
            if (searchtag) {
              const tags = masterarrt[index].split(',').map(tag => tag.trim());
              const searchTags = searchtag.split(',').map(tag => tag.trim());
              if (!searchTags.some(tag => tags.includes(tag))) {
                return null;
              }
            }
            if (masterarruser[index] !== localStorage.getItem('username') && !masterarrj[index].includes(localStorage.getItem('username')))
              return (
                <Card
                  name={name}
                  description={masterarrd[index]}
                  tags={masterarrt[index]}
                  bannedkeywords={masterarrk[index]}
                  joinedusers={masterarrj[index]}
                  users={masterarruser[index]}
                  leftusers={masterarrlu[index]}
                  blockusers={masterarrbu[index]}
                  onOpen={() => opens(name)}
                />
              );
          })}
        </div>
        <div className='login-containera'>
          {/* <button className="add-button" type="submit" onClick={addgreddits}>ADD</button> */}
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
              <button className="save-button" type="submit" onClick={reset}>SAVE</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default Allsubgreddits;