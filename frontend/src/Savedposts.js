import './Log_in.css';
import Card from './Card5.js';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AccountCircle, ExitToApp, ArrowForward, ListAlt,Bookmark } from '@material-ui/icons';
import { useState, useEffect } from 'react';
const useStyles = makeStyles(() => ({ appBar: { background: 'linear-gradient(45deg, #5dc4d6 30%, #d66fc8 90%)' } }));
function Homesubgreddits() {
    const classes = useStyles();
    const navigate = useNavigate();
    var arrt = [];
    var arrc = [];
    var arrpb = [];
    var arrpi = [];
    var arru = [];
    var arrd = [];
    var arrid = [];
    const username = localStorage.getItem('username')
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
    useEffect(function () {
        const fetchCredentials = async () => {
            try {
                const response = await fetch(`/api/get-savedposts/${username}`);
                const data = await response.json();
                if (response.ok) {
                    const arrt = data.savedposts.map((e) => e.text);
                    setMasterarrt(arrt);
                    const arrpb = data.savedposts.map((e) => e.postedby);
                    setMasterarrpb(arrpb);
                    const arrpi = data.savedposts.map((e) => e.postedin);
                    setMasterarrpi(arrpi);
                    const arrc = data.savedposts.map((e) => e.comments);
                    setMasterarrc(arrc);
                    const arru = data.savedposts.map((e) => e.upvotes);
                    setMasterarru(arru);
                    const arrd = data.savedposts.map((e) => e.downvotes);
                    setMasterarrd(arrd);
                    const arrid = data.savedposts.map((e) => e._id);
                    setMasterarrid(arrid);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCredentials();
        /*eslint-disable-next-line*/
    }, []);
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
                                <Button color="inherit" endIcon={<Bookmark />}>
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
                    {masterarrt && masterarrt.map((text, index) => (
                        <Card
                            text={text}
                            postedby={masterarrpb[index]}
                            postedin={masterarrpi[index]}
                            comments={masterarrc[index]}
                            upvotes={masterarru[index]}
                            downvotes={masterarrd[index]}
                            // onLike={() => likes(index)}
                            // onDislike={() => dislikes(index)}
                            id={masterarrid[index]}
                            masterarrt={masterarrt}
                            setMasterarrt={setMasterarrt}
                        // onAdd={() => (index)}
                        />

                    ))}
                </div>
            </div>
        </div>
    )
}
export default Homesubgreddits;
