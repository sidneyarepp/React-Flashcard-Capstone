import React, { useState, useEffect } from 'react';
import { readDeck, createCard } from '../utils/api';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function AddCard() {
    const [newCardFormData, setNewCardFormData] = useState({ front: '', back: '' });
    const [deckInfo, setDeckInfo] = useState({});

    const { deckId } = useParams();

    useEffect(() => {
        const { signal, abort } = new AbortController();

        readDeck(deckId, signal).then(deckInformation => setDeckInfo(deckInformation)).catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Aborted');
            } else {
                throw error;
            }
        })

        return () => abort;
    }, [deckId])

    function handleChange(e) {
        setNewCardFormData({ ...newCardFormData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { signal } = new AbortController();

        createCard(deckId, newCardFormData, signal).then(setNewCardFormData({})).catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Cancelled');
            } else {
                throw error;
            }
        })
        setNewCardFormData({ front: '', back: '' })
    }

    return (
        <div>
            <p><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} >{deckInfo.name}</Link> / <span>Add Card</span></p>
            <h2>{deckInfo.name}: <span>Add Card</span></h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='front'>Front</label>
                <textarea type='text' name='front' id='front' value={newCardFormData.front} onChange={handleChange} />
                <label htmlFor='back'>Back</label>
                <textarea type='text' name='back' id='back' value={newCardFormData.back} onChange={handleChange} />
                <Link to={`/decks/${deckId}`} className='btn btn-secondary'>Done</Link>
                <button type='submit' className='btn btn-primary'>Save</button>
            </form>
        </div>
    )
}

export default AddCard;