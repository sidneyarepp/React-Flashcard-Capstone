import React, { useEffect, useState } from 'react';
import DeckForm from './DeckForm';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { updateDeck } from '../utils/api/index';

//This component is a sub-component of the 'DisplayDeckCards' component.  It handles the functionality for when a user clicks the 'Edit' button for a deck.
function EditDeck({ deckData, setDeckData, decks }) {

    const [formDeckData, setFormDeckData] = useState({ name: '', description: '' });
    const { deckId } = useParams();
    const history = useHistory();
    const currentDeck = decks.find(deck => Number(deck.id) === Number(deckId))

    useEffect(() => {
        const { signal, abort } = new AbortController();

        // When the component mounts the deckData state is updated to reflect the deck chosen by the user.
        readDeck(deckId, signal)
            .then(deckInformation => {
                setDeckData(deckInformation);
                setFormDeckData(deckInformation);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted')
                } else {
                    throw error;
                }
            })
        return () => abort;
    }, [deckId, setDeckData, setFormDeckData])

    function handleEditSubmit(e) {
        e.preventDefault();
        const { signal, abort } = new AbortController();

        updateDeck(formDeckData, signal)
            .then(data => setDeckData(data))
            .then(history.push(`/decks/${deckId}`))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    throw error;
                }
            })
        console.log(decks)
        return () => abort;
    }

    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} >{currentDeck.name}</Link> / Edit Deck</p>
            <h1 className="mb-3">Edit Deck</h1>
            <DeckForm deckData={deckData} setDeckData={setDeckData} handleEditSubmit={handleEditSubmit} formDeckData={formDeckData} setFormDeckData={setFormDeckData} />
        </div >
    )
}

export default EditDeck;