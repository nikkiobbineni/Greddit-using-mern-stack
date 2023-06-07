import { useParams } from "react-router-dom";
import './Log_in.css';
import Card from './Card2.js';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, ExitToApp, ArrowForward, ListAlt,Bookmark } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
const useStyles = makeStyles(() => ({ appBar: { background: 'linear-gradient(45deg, #5dc4d6 30%, #d66fc8 90%)' } }));
function Homesubgreddits() {
    const { gredditname } = useParams();
    // console.log(gredditname)
    const classes = useStyles();
    const navigate = useNavigate();
    const [pqr, setPqr] = useState("false");
    const [text, setText] = useState("");
    const [comments, setComments] = useState("");
    const [postedby, setPostedby] = useState("");
    const [postedin, setPostedin] = useState("");
    const [downvotes, setDownvotes] = useState("");
    const [addcomment, setAddcomment] = useState("")
    const username = localStorage.getItem('username');
    const [upvotes, setUpvotes] = useState("");
    const [join, setJoin] = useState("");
    var arrt = [];
    var arrc = [];
    var arrpb = [];
    var arrpi = [];
    var arru = [];
    var arrd = [];
    var arrid = [];
    // var arruu =[];
    // var arrdu =[];
    const [masterarrt, setMasterarrt] = useState()
    const [masterarrc, setMasterarrc] = useState()
    const [masterarrpb, setMasterarrpb] = useState()
    const [masterarrpi, setMasterarrpi] = useState()
    const [masterarru, setMasterarru] = useState()
    const [masterarrd, setMasterarrd] = useState()
    const [masterarrid, setMasterarrid] = useState()
    function logout() {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        navigate('/');
    }
    function check() {
        navigate('/profile');
    }
    function checka() {
        navigate('/mysubgreddits');
    }
    function checkb() {
        navigate('/allsubgreddits');
    }
    function addgreddits() {
        setPqr("true")
    }
    function checkc() {
        navigate('/savedposts');
    }
    function checkvote(index) {
        console.log("awjd")
        const fetchdata = async () => {
            console.log("this")
            const response = await fetch('/api/check-votes', {
                method: 'POST',
                body: JSON.stringify({
                    "upvoteUser": localStorage.getItem('username'),
                    "id": masterarrid[index]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (response.ok) {
                edits(index, 1, 0)
                console.log("jksXd,h")
            }
            else {
                alert("You have already upvoted the post");
            }
        }
        fetchdata()
    }
    function checkvote2(index) {
        console.log("awjd")
        const fetchdata = async () => {
            console.log("this")
            const response = await fetch('/api/check-downvotes', {
                method: 'POST',
                body: JSON.stringify({
                    "upvoteUser": localStorage.getItem('username'),
                    "id": masterarrid[index]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (response.ok) {
                edits(index, 0, 1)
                console.log("jksXd,h")
            }
            else {
                alert("You have already downvoted the post");
            }
        }
        fetchdata()
    }
    function edits(index, a, b) {
        // console.log(upvotes)
        const fetchdata = async () => {
            console.log("this")
            const response = await fetch('/api/edit-posts', {
                method: 'POST',
                body: JSON.stringify({
                    "name": gredditname,
                    "text": masterarrt[index],
                    "postedby": masterarrpb[index],
                    "postedin": masterarrpi[index],
                    "comments": masterarrc[index],
                    "upvotes": masterarru[index] + a,
                    "downvotes": masterarrd[index] + b,
                    "join": join,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (response.ok) {
                console.log("YES")
                const temparr = []
                masterarru.map((elem) => {
                    temparr.push(elem)
                })
                temparr[index] += a
                setMasterarru(temparr)
                const temparr2 = []
                masterarrd.map((elem) => {
                    temparr2.push(elem)
                })
                temparr2[index] += b
                setMasterarrd(temparr2)

            }
        }

        fetchdata();
    }
    function likes(index) {
        // console.log("jksXd,h")
        checkvote(index)
    }
    function dislikes(index) {
        checkvote2(index)
    }
    useEffect(function () {
        const fetchCredentials = async () => {
            const response = await fetch(`/api/get-posts/${gredditname}`);
            const data = await response.json();
            if (response.ok) {
                const { text } = data.map((e) => (
                    arrt.push(e.text)
                ));
                setMasterarrt(arrt)
                const { postedby } = data.map((e) => (
                    arrpb.push(e.postedby)
                ));
                setMasterarrpb(arrpb)
                const { postedin } = data.map((e) => (
                    arrpi.push(e.postedin)
                ));
                setMasterarrpi(arrpi)
                const { comments } = data.map((e) => (
                    arrc.push(e.comments)
                ));
                setMasterarrc(arrc)
                const { upvotes } = data.map((e) => (
                    arru.push(e.upvotes)
                ));
                setMasterarru(arru)

                const { downvotes } = data.map((e) => (
                    arrd.push(e.downvotes)
                ));
                setMasterarrd(arrd)
                const { _id } = data.map((e) => (
                    arrid.push(e._id)
                ));
                setMasterarrid(arrid)
                console.log(arrid)
                arrt = []
                arrc = []
                arrpb = []
                arrpi = []
                arrd = []
                arru = []
                arrid = []
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
    console.log(masterarrc)
    function reset(e) {
        const fetchdata = async () => {
            const response = await fetch('/api/add-posts', {
                method: 'POST',
                body: JSON.stringify({
                    "name": gredditname,
                    "text": text,
                    "postedby": username,
                    "postedin": gredditname,
                    "comments": comments,
                    "upvotes": 0,
                    "downvotes": 0,
                    "join": false,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                console.log("YES")
                setMasterarrpb(localStorage.getItem('username'))
                setMasterarrpi(gredditname)
                // setMasterarrt([
                //     ...masterarrt,
                //     text
                // ])
                setMasterarrt([
                    ...masterarrt,
                    data.text
                ])
                setMasterarrc([
                    ...masterarrc,
                    comments
                ])
                setMasterarrpb([
                    ...masterarrpb,
                    username
                ])
                setMasterarrpi([
                    ...masterarrpi,
                    gredditname
                ])
                setMasterarru([
                    ...masterarrd,
                    0
                ])
                setMasterarrd([
                    ...masterarru,
                    0
                ])
                setMasterarrid([
                    ...masterarrid,
                    data._id
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
            <div >
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Grid container alignItems="flex-start" justify="flex-start">
                            <Grid item>
                                <Button color="inherit" onClick={check} endIcon={<AccountCircle />}>
                                    Profile
                                </Button>
                                <Button color="inherit" endIcon={<ArrowForward />} onClick={checka}>
                                    MySubgreddits
                                </Button>
                                <Button color="inherit" endIcon={<ListAlt />} onClick={checkb}>
                                    Allsubgreddits
                                </Button>
                                <Button color="inherit" endIcon={<Bookmark />} onClick={checkc}>
                                    SavedPosts
                                </Button>

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
                <img src="https://icon-library.com/images/reddit-app-icon/reddit-app-icon-7.jpg" alt="Reddit App Icon" style={{ width: "100px", height: "100px" }} />
                    <br/>
                    <br/>
                    {masterarrt && masterarrt.map((text, index) => (
                        <Card
                            text={text}
                            postedby={masterarrpb[index]}
                            postedin={masterarrpi[index]}
                            comments={masterarrc[index]}
                            upvotes={masterarru[index]}
                            downvotes={masterarrd[index]}
                            onLike={() => likes(index)}
                            onDislike={() => dislikes(index)}
                            id={masterarrid[index]}
                        // onAdd={() => (index)}
                        />

                    ))}
                </div>
                {console.log(masterarrid)}
                <div className='login-containera'>
                    <button className="add-button" type="submit" onClick={addgreddits}>ADD</button>
                    {pqr === "true" &&
                        <div className="login-box">
                            <div className="h2">
                                <h2>NEW POST</h2>
                            </div>
                            <label>
                                <br />
                                <input
                                    className="input-field"
                                    placeholder="Text"
                                    type="text"
                                    value={text}
                                    onChange={(e) => { setText(e.target.value); }}
                                />
                            </label>
                            {/* <label>
                                <br />
                                <input
                                    className="input-field"
                                    placeholder="Postedby"
                                    type="text"
                                    value={postedby}
                                    onChange={(e) => { setPostedby(e.target.value); }}
                                    setPostedby(localStorage.getItem('username'))
                                />
                            </label>
                            <label>
                                <br />
                                <input
                                    className="input-field"
                                    placeholder="Postedin"
                                    type="text"
                                    value={postedin}
                                    onChange={(e) => { setPostedin(e.target.value); }}
                                />
                            </label> */}
                            <label>
                                <br />
                                <input
                                    className="input-field"
                                    placeholder="Comments"
                                    type="text"
                                    value={comments}
                                    onChange={(e) => { setComments(e.target.value); }}
                                />
                            </label>
                            <button className="save-button" type="submit" onClick={reset} disabled={!text || !comments}>SAVE</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Homesubgreddits;
