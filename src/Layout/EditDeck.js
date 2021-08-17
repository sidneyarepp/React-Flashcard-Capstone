import React, { useEffect, useState } from 'react';
import DeckForm from './DeckForm';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { updateDeck } from '../utils/api/index';

//This component is a sub-component of the 'DisplayDeckCards' component.  It handles the functionality for when a user clicks the 'Edit' button for a deck.
function EditDeck() {

    const history = useHistory();
    const [deckData, setDeckData] = useState({ name: '', description: '' })
    const { deckId } = useParams();

    useEffect(() => {
        const { signal, abort } = new AbortController();

        //When the component mounts the deckData state is updated to reflect the deck chosen by the user.
        readDeck(deckId, signal)
            .then(deckInformation => setDeckData(deckInformation))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    throw error;
                }
            })
        return () => abort;
    }, [deckId, setDeckData])

    function handleEditSubmit(e) {
        e.preventDefault();
        const { signal, abort } = new AbortController();

        updateDeck(deckData, signal)
            .then(history.push(`/decks/${deckId}`))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    throw error;
                }
            })
        return () => abort;
    }


    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} >{deckData.name}</Link> / Edit Deck</p>
            <h1 className="mb-3">Edit Deck</h1>
            <DeckForm deckData={deckData} setDeckData={setDeckData} handleEditSubmit={handleEditSubmit} />
        </div >
    )
}

export default EditDeck;