import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import { deleteCard } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//This is a sub-component of the DisplayDeckCards component.  It handles the structure for the deck cards displayed on the "View" page.
function DeckCard({ card, deleteCardInState }) {
    const { id, front, back } = card;
    const { url } = useRouteMatch();

    //Handler for if the user chooses to delete a card from a deck on the "View" page.
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
        <div className="card d-flex mb-3" style={{ width: "30rem" }} id={id}>
            <div className="card-body">
                <div>
                    <h6><span className="text-primary">Front:</span> {front}</h6>
                </div>
                <div className="my-3">
                    <h6><span className="text-primary">Back:</span> {back}</h6>
                </div>
                <div className='row'>
                    <Link to={`${url}/cards/${id}/edit`} className="btn btn-primary ml-3"><FontAwesomeIcon icon={faPencilAlt} /> Edit</Link>
                    <button className="btn btn-danger ml-2" onClick={handleDeleteCard}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
            </div>
        </div>
    )
};

export default DeckCard;