import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function EditDeck({ setDeckInfo }) {

    const [deckData, setDeckData] = useState({ name: '', description: '' });
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const { signal, abort } = new AbortController();

        readDeck(deckId, signal).then(deckInformation => setDeckData(deckInformation)).catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Aborted');
            } else {
                throw error;
            }
        })
        return () => abort;
    }, [deckId])

    function handleChange(e) {
        setDeckData({ ...deckData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { signal } = new AbortController();

        updateDeck(deckData, signal).then(setDeckInfo(deckData)).then(history.push(`/decks/${deckId}`)).catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Aborted');
            } else {
                throw error;
            }
        })
    }

    return (
        <div>
            <p><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} >{deckData.name}</Link> / Edit Deck</p>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' onChange={handleChange} value={deckData.name} />
                <label htmlFor='description'>Description</label>
                <textarea type='text' name='description' id='description' onChange={handleChange} value={deckData.description} />
                <Link to={`/decks/${deckId}`} className='btn btn-secondary'>Cancel</Link>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div >
    )
}

export default EditDeck;