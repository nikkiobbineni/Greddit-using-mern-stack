import './Card.css'
import React from 'react';
import { useParams } from "react-router-dom";
const Card = (props) => {
    const { name } = useParams();
    console.log(props.name);
    return (
        <div className="card">
            <div className="card-content">
                <h2>{props.name}</h2>
                <button onClick={props.onAccept}>Accept</button>
                <button onClick={props.onReject}>Reject</button>
            </div>
        </div>
    );
};

export default Card;
