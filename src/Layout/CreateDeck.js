import React, { useState } from 'react';
import DeckForm from './DeckForm';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { createDeck } from '../utils/api/index';

//This component is a sub-component of the 'CardList' component.  It handles the structure for when a user clicks the 'Create Deck' button.  All logic is handled in the "DeckForm" sub-component.
function CreateDeck() {

    const history = useHistory();
    const [formDeckData, setFormDeckData] = useState({ name: '', description: '' });

    function handleCreateSubmit(e) {
        e.preventDefault();
        const { signal, abort } = new AbortController();

        createDeck(formDeckData, signal)
            .then(history.push('/'))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Cancelled');
                } else {
                    throw error;
                }
            })
        return () => abort;
    }


    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / Create Deck</p>
            <h1>Create Deck</h1>
            <DeckForm formDeckData={formDeckData} setFormDeckData={setFormDeckData} handleCreateSubmit={handleCreateSubmit} />
        </div>
    )
}

export default CreateDeck;