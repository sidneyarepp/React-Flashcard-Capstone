import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function EditCard() {
    const [deckInfo, setDeckInfo] = useState({});
    const [cardInformation, setCardInformation] = useState({ front: '', back: '' });
    const { deckId, cardId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const { signal, abort } = new AbortController();

        readDeck(deckId, signal)
            .then(deckInformation => setDeckInfo(deckInformation))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    throw error;
                }
            });

        readCard(cardId, signal)
            .then(cardData => setCardInformation(cardData))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    throw error;
                }
            });


        return () => abort;
    }, [deckId, cardId])

    function handleChange(e) {
        setCardInformation({ ...cardInformation, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateCard(cardInformation)
            .then(setCardInformation({ front: '', back: '' }))
            .then(history.push(`/decks/${deckId}`))
    }

    return (
        <div>
            <p><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} >{deckInfo.name}</Link> / Edit Card {cardId}</p>
            <h1>Edit Card</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='front'>Front</label>
                <textarea type='text' name='front' id='front' value={cardInformation.front} onChange={handleChange} />
                <label htmlFor='back'>Back</label>
                <textarea type='text' name='back' id='back' value={cardInformation.back} onChange={handleChange} />
                <Link to={`/decks/${deckId}`} className='btn btn-secondary'>Cancel</Link>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default EditCard;