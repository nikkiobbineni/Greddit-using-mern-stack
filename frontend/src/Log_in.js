import './Log_in.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles(() => ({ appBar: { background: 'linear-gradient(45deg, #5dc4d6 30%, #d66fc8 90%)' } }));
function Log_in() {
  const classes = useStyles();
  const [abc, setAbc] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lname, setLname] = useState("");
  const [fname, setFname] = useState("");
  const [age, setAge] = useState("");
  const [phno, setPhno] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(function () {
    if (localStorage.getItem('username')) {
      navigate("/profile")
    }
    /*eslint-disable-next-line*/
  }, []);
  function checkCredentials() {
    const fetchdata = async () => {
      const response = await fetch('/api/check-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      })
      // console.log("thsi")
      const data = await response.json();
      console.log(data)
      if (data.ok) {
        console.log("YES")
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        navigate("/profile")
      }
      else {
        alert("Invalid Credentials!! Please check")
      }
    }

    fetchdata();

  }
  function backAgain() {
    const fetchdata = async () => {
      console.log("this")
      const response = await fetch('/api/add-credentials', {
        method: 'POST',
        // body: JSON.stringify(username,password),
        body: JSON.stringify({
          "fname": fname,
          "lname": lname,
          "username": username,
          "email": email,
          "age": age,
          "phno": phno,
          "password": password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("thsi")
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        console.log("YES")
        setAbc("login")
        navigate("/")
      }
      else {
        console.log("No")
      }
    }

    fetchdata();
  }
  function setingLogin() {
    setUsername("")
    setPassword("")
    setAbc("login")
  }
  function setingSignin() {
    setUsername("")
    setPassword("")
    setAbc("signup")
  }
  return (
    <div>
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid container alignItems="flex-start" justifyContent="flex-start">
              <Grid item>
              </Grid>
            </Grid>
            <Button color="inherit" onClick={setingLogin} >LOGIN</Button>
            <Button color="inherit" onClick={setingSignin} >SIGNIN</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="login-container">
        {abc === "login" &&
          <div className="login-box">
            <div className="h2">
              <h2>LOGIN</h2>
            </div>
            <label>
              <br />
              <input
                className="input-field"
                placeholder="Enter username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); }}
                type="text"
              />
            </label>
            <label>
              <br />
              <input
                className="input-field"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </label>
            <br />
            <button className="submit-button" type="submit" disabled={!username || !password} onClick={checkCredentials}>LOGIN</button>
          </div>}
        {abc === "signup" &&
          <div className="login-box" >
            <div>
              <h2>SIGNUP</h2>
            </div>
            <label>
              <br />
              <input
                className="input-field"
                placeholder="Enter FirstName"
                value={fname}
                type="text"
                onChange={(e) => { setFname(e.target.value) }}
              />
            </label>
            <label>
              <br />
              <input
                className="input-field"
                placeholder="Enter Lastname"
                value={lname}
                type="text"
                onChange={(e) => { setLname(e.target.value) }}
              />
            </label>
            <label>
              <br />
              <input
                className="input-field"
                placeholder="Username"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
                type="text"
              />
            </label>
            <br />
            <label>
              <input
                className="input-field"
                placeholder="Mail"
                value={email}
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </label>
            <label>
              <br />
              <input
                className="input-field"
                placeholder="Age"
                value={age}
                type="number"
                onChange={(e) => { setAge(e.target.value) }}
              />
              <br />
              <label>
                <input
                  className="input-field"
                  placeholder="Contact Number"
                  value={phno}
                  type="text"
                  onChange={(e) => { setPhno(e.target.value) }}
                />
              </label>
              <label>
                <br />
                <input
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  type="password"
                />
              </label>
            </label>
            <button className="submit-button" type="submit" disabled={!username || !password || !age || !phno || !email || !lname || !fname} onClick={backAgain}>REGISTER</button>
          </div>}
      </div>
    </div>
  )
}
export default Log_in;
