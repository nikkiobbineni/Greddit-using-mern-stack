import { useParams } from "react-router-dom";
import './Log_in.css';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card4.js';
import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { AccountCircle, ExitToApp, ArrowForward, ListAlt, Bookmark } from '@material-ui/icons';
const useStyles = makeStyles(() => ({ appBar: { background: 'linear-gradient(45deg, #5dc4d6 30%, #d66fc8 90%)' } }));
function Homesubgreddits() {
  const [users, setUsers] = useState("true");
  const [pendinguser, setPendinguser] = useState("false");
  const [stats, setStats] = useState("false");
  const [reportedpage, setReportedpage] = useState("false");
  const [joins, setJoins] = useState("")
  const [pending, setPending] = useState("")
  const [ignoreClicked, setIgnoreClicked] = useState(false);
  const [block, setBlock] = useState("")
  const [isignored,setIsignored] = useState(false)
  var arrj = [];
  var arrp = [];
  var arrb = [];
  const [masterarrj, setMasterarrj] = useState()
  const [masterarrp, setMasterarrp] = useState()
  const [masterarrb, setMasterarrb] = useState()
  const [masterarrrp, setMasterarrrp] = useState()
  const [masterarrro, setMasterarrro] = useState()
  const [masterarrc, setMasterarrc] = useState()
  const [masterarrt, setMasterarrt] = useState()
  const [masterarri, setMasterarri] = useState()
  const [masterarrig, setMasterarrig] = useState()
  const [masterarruc, setMasterarruc] = useState()
  const [masterarrtym, setMasterarrtym] = useState()
  const { name } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  function userssetting() {
    setPendinguser("false")
    setReportedpage("false")
    setStats("false")
    setUsers("true")
  }
  function pendingsetting() {
    setPendinguser("true")
    setReportedpage("false")
    setStats("false")
    setUsers("false")
  }
  function statssetting() {
    setPendinguser("false")
    setReportedpage("false")
    setStats("true")
    setUsers("false")
  }
  function reportsetting() {
    setPendinguser("false")
    setReportedpage("true")
    setStats("false")
    setUsers("false")
  }
  function blockhim(index) {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/block-req', {
        method: 'POST',
        body: JSON.stringify({
          "reportedon": masterarrro[index],
          "name" : name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        
      }
    }
    fetchdata();
  }
  function deletehim(id) {
    // console.log(id)
    const fetchdata = async () => {
      console.log(id)
      // console.log("this")
      const res = await fetch(`/api/delete-post/${id}`, {
        method: 'POST',
        // body: JSON.stringify()
        headers: {
          'Content-Type': 'application/json'

        }
      })
      const data = await res.json()
      console.log("yes")
      console.log(data)
      if (res.ok) {
        var temparr = []
        masterarrrp.map((elem) => {
          if (elem != data.reportedby) {
            temparr.push(elem)
          }
        })
        setMasterarrrp(temparr)

        temparr = []
        masterarrro.map((elem) => {
          if (elem != data.reportedon) {
            temparr.push(elem)
          }
        })
        setMasterarrro(temparr)

        var temparr = []
        masterarrc.map((elem) => {
          if (elem != data.concern) {
            temparr.push(elem)
          }
        })
        setMasterarrc(temparr)

        var temparr = []
        masterarrt.map((elem) => {
          if (elem != data.text) {
            temparr.push(elem)
          }
        })
        setMasterarrt(temparr)
      }
    }
    fetchdata();
    // console.log(masterarrn)
    const temparr = []
    masterarri.map((elem) => {
      if (elem != id) {
        temparr.push(elem)
      }
    })
    // masterarrn.pop(name)
    // console.log(temparr)
    setMasterarri(temparr)
  }
  function ignorehim(index) {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/ignore-req', {
        method: 'POST',
        body: JSON.stringify({
          "reportedby": masterarrrp[index],
          "id": masterarri[index]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        const x = masterarrig
        x[index] = 1;
        console.log(x)
        setMasterarrig(x)
        console.log(masterarrig)
      }
    }
    fetchdata();
  }
  useEffect(function () {
    const fetchCredentials = async () => {
      // const name = name;
      const response = await fetch(`/api/get-reports/${name}`);
      const data = await response.json();
      // console.log(data)
      if (response.ok) {
        const reportedby = data.flatMap((e) => e.reportedby);
        setMasterarrrp(reportedby);
        const reportedon = data.flatMap((e) => e.reportedon);
        setMasterarrro(reportedon);
        const concern = data.flatMap((e) => e.concern);
        setMasterarrc(concern);
        const text = data.flatMap((e) => e.text);
        setMasterarrt(text);
        const id = data.flatMap((e) => e._id);
        setMasterarri(id);
        const ignoredusers = data.flatMap((e) => e.ignore);
        setMasterarrig(ignoredusers);
      }
      else {
        console.error(data.error);
      }
    };
    fetchCredentials();
    /*eslint-disable-next-line*/
  }, [reportedpage,masterarrig]);
  function add(item) {
    // console.log(item)
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/accept-req', {
        method: 'POST',
        body: JSON.stringify({
          "username": item,
          "name": name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        var temparr = []
        masterarrp.map((elem) => {
          if (elem != item) {
            temparr.push(elem)
          }
        })
        // masterarrn.pop(name)
        // console.log(temparr)
        setMasterarrp(temparr)
      }
      else {
        alert(data.error)
      }
    }
    fetchdata();
  }
  function reject(item) {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/reject-req', {
        method: 'POST',
        body: JSON.stringify({
          "username": item,
          "name": name
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (response.ok) {
        var temparr = []
        masterarrp.map((elem) => {
          if (elem != item) {
            temparr.push(elem)
          }
        })
        // masterarrn.pop(name)
        // console.log(temparr)
        setMasterarrp(temparr)
      }
    }
    fetchdata();
  }
  // console.log("wkdjwe")
  useEffect(function () {
    const fetchCredentials = async () => {
      try {
        const response = await fetch(`/api/get-users/${name}`);
        const data = await response.json();
        if (response.ok) {
          const joinedusers = data.flatMap((e) => e.joinedusers);
          setMasterarrj(joinedusers);
          const pendingusers = data.flatMap((e) => e.pendingusers);
          setMasterarrp(pendingusers);
          const blockedusers = data.flatMap((e) => e.blockedusers);
          setMasterarrb(blockedusers);
          // const ignoredusers = data.flatMap((e) => e.ignore);
          // setMasterarrig(ignoredusers);
          // const ignoredusers = data.flatMap((e) => e.ignore ? [e.ignore] : []);
          // setMasterarrig(ignoredusers);
          // console.log(ignoredusers)
          const usercounting = data.flatMap((e) => e.usercount);
          setMasterarruc(usercounting);
          const timestamps = data.flatMap((e) => e.time);
          setMasterarrtym(timestamps);
          // console.log(timestamps)
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCredentials();
  }, [users]);
  function check() {
    navigate('/profile');
  }
  function checka() {
    navigate('/allsubgreddits');
  }
  function checkc() {
    navigate('/mysubgreddits');
  }
  function checkb() {
    navigate('/savedposts');
  }
  // console.log(masterarrrp)
  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/');
  }
  console.log(masterarri)
  return (
    <div>
      <div >
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid container alignItems="flex-start" justify="flex-start">
              <Grid item>
                <Button color="inherit" onClick={check} endIcon={<AccountCircle />}>
                  Profile
                </Button>
                <Button color="inherit" endIcon={<ArrowForward />} onClick={checkc}>
                  MySubgreddits
                </Button>
                <Button color="inherit" endIcon={<ListAlt />} onClick={checka}>
                  Allsubgreddits
                </Button>
                <Button color="inherit" endIcon={<Bookmark />} onClick={checkb}>
                  Saved Posts
                </Button>

              </Grid>
            </Grid>
            <Button color="inherit" endIcon={<ExitToApp />} onClick={logout}>
              Logout
            </Button>          </Toolbar>
        </AppBar>
      </div>
      <div className='bg'>
        <AppBar position="static" color="transparent">
          <Tabs textColor="inherit" indicatorColor="secondary" aria-label="My tabs">
            <Tab label="Users" onClick={userssetting} />
            <Tab label="Pending Request" onClick={pendingsetting} />
            <Tab label="Statistics" onClick={statssetting} />
            <Tab label="Reported page" onClick={reportsetting} />
          </Tabs>
        </AppBar>
        {users === "true" &&
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div style={{ border: '2px solid black', borderRadius: '15px', width: '50%', margin: 'auto', padding: '20px' }}>
              <h2 style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '24px' }}>Joined Users</h2>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {masterarrj && masterarrj.map((item, index) => (
                  <li key={index} style={{ marginBottom: '20px', fontSize: '18px', lineHeight: '1.5' }}>{item}</li>
                ))}
              </ul>
              <h2 style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '24px' }}>Blocked Users</h2>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {masterarrb && masterarrb.map((item, index) => (
                  <li key={index} style={{ fontColor: 'grey', marginBottom: '10px', fontSize: '18px', lineHeight: '1.5' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>}
        {pendinguser === "true" &&
          <div>
            <h2>Pending Users </h2>
            {masterarrp && masterarrp.map((name, index) => (
              <Card
                name={name}
                onAccept={(e) => { e.preventDefault(); add(name) }}
                onReject={(e) => { e.preventDefault(); reject(name) }}
              />
            ))}
          </div>
        }
        {reportedpage === "true" &&
          <table>
            <thead>
              <tr>
                <th>Reported By</th>
                <th>Whom we have reported</th>
                <th>Concern</th>
                <th>Text of the Post</th>
                <th>Block</th>
                <th>Delete</th>
                <th>Ignore</th>
              </tr>
            </thead>
            <tbody>
              {console.log(masterarrig)}
              {masterarrt.map((item, index) => (
                <tr key={index}>
                  <td>{masterarrrp[index]}</td>
                  <td>{masterarrro[index]}</td>
                  <td>{masterarrc[index]}</td>
                  <td>{item}</td>
                  {console.log(masterarrig[index])}
                  {masterarrig[index] === 1 &&
                    <div>
                      <td><button onClick={() => blockhim(index)} disabled={true}>Block</button></td>
                      <td><button onClick={() => deletehim(masterarri[index])} disabled={true}>Delete</button></td>
                    </div>
                  }
                  {masterarrig[index] === 0 &&
                    <div>
                      <td><button onClick={() => blockhim(index)} >Block</button></td>
                      <td><button onClick={() => deletehim(masterarri[index])} >Delete</button></td>
                    </div>
                  }
                  <td><button onClick={() => ignorehim(index)}>Ignore</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        {stats === "true" &&
          <div>
            <h2>Statistics</h2>
            {masterarrp && masterarrp.map((name, index) => (
              <Card
                name={name}
                onAccept={(e) => { e.preventDefault(); add(name) }}
                onReject={(e) => { e.preventDefault(); reject(name) }}
              />
            ))}
          </div>
        }
      </div>
    </div >
  )
}
export default Homesubgreddits;
