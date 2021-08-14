import React, { useEffect } from 'react';
import { readDeck, createCard } from '../utils/api';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function AddOrEditCard({ deckData, setDeckData, cardInformation, setCardInformation }) {

    const { deckId } = useParams();

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
    }, [deckId, setDeckData])

    function handleChange(e) {
        setCardInformation({ ...cardInformation, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { signal } = new AbortController();

        createCard(deckId, cardInformation, signal).then(setCardInformation({})).catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Cancelled');
            } else {
                throw error;
            }
        })
        setCardInformation({ front: '', back: '' })
    }

    return (
        <div>
            <p><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} >{deckData.name}</Link> / <span>Add Card</span></p>
            <h2>{deckData.name}: <span>Add Card</span></h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='front'>Front</label>
                <textarea type='text' name='front' id='front' value={cardInformation.front} onChange={handleChange} />
                <label htmlFor='back'>Back</label>
                <textarea type='text' name='back' id='back' value={cardInformation.back} onChange={handleChange} />
                <Link to={`/decks/${deckId}`} className='btn btn-secondary'>Done</Link>
                <button type='submit' className='btn btn-primary'>Save</button>
            </form>
        </div>
    )
}

export default AddOrEditCard;