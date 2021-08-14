import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import { deleteCard } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function DeckCard({ card, deleteCardInState }) {
    const { id, front, back } = card;
    const { url } = useRouteMatch();

    function handleDeleteCard() {
        const { signal } = new AbortController();
        const response = window.confirm('Delete this deck?\n\nYou will not be able to recover it.')
        if (response) {
            deleteCard(id, signal).then(deleteCardInState(id)).catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Cancelled');
                } else {
                    throw error
                };
            })
        }
    };

    return (
        <div className="card" style={{ width: "18rem" }} id={id}>
            <div className="card-body">
                <div className="card-front">
                    <h6>{front}</h6>
                </div>
                <div>
                    <h6>{back}</h6>
                </div>
                <Link to={`${url}/cards/${id}/edit`} className="btn btn-primary"><FontAwesomeIcon icon={faPencilAlt} /> Edit</Link>
                <button className="btn btn-danger" onClick={handleDeleteCard}><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
        </div>
    )
};

export default DeckCard;