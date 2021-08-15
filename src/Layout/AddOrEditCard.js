import React, { useEffect } from 'react';
import { Link, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import { readDeck, readCard, createCard, updateCard } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function AddOrEditCard({ deckData, setDeckData, cardInformation, setCardInformation, setCurrentCardIndex, setCardSide }) {

    const { deckId, cardId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const { signal, abort } = new AbortController();

        if (url.includes('new')) {
            readDeck(deckId, signal)
                .then(deckInformation => setDeckData(deckInformation))
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Fetch Aborted');
                    } else {
                        throw error;
                    }
                })
        } else {
            readDeck(deckId, signal)
                .then(deckInformation => setDeckData(deckInformation))
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Fetch Aborted');
                    } else {
                        throw error;
                    }
                })

            readCard(cardId, signal)
                .then(cardData => setCardInformation(cardData))
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Fetch Aborted');
                    } else {
                        throw error;
                    }
                })
        }

        return () => abort;
    }, [deckId, cardId, setCardInformation, setDeckData, url])

    function handleChange(e) {
        setCardInformation({ ...cardInformation, [e.target.name]: e.target.value });
    }

    function handleSubmitAddCard(e) {
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

    function handleSubmitEditCard(e) {
        e.preventDefault();
        updateCard(cardInformation)
            .then(setCardInformation({ front: '', back: '' }))
            .then(history.push(`/decks/${deckId}`))
    }

    function handleDoneAndCancelButtons(e) {
        e.preventDefault();
        setCardInformation({ front: '', back: '' });
        history.push(`/decks/${deckId}`);
    }

    function handleLinkClick() {
        setCardInformation({ front: '', back: '' });
        setCurrentCardIndex(0);
        setCardSide('front');
    }

    return (
        url.includes('new')

            ?

            <div>
                <p><Link to={'/'} onClick={handleLinkClick}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} onClick={handleLinkClick}>{deckData.name}</Link> / <span>Add Card</span></p>
                <h2>{deckData.name}: <span>Add Card</span></h2>
                <form onSubmit={handleSubmitAddCard}>
                    <label htmlFor='front'>Front</label>
                    <textarea type='text' name='front' id='front' value={cardInformation.front} onChange={handleChange} />
                    <label htmlFor='back'>Back</label>
                    <textarea type='text' name='back' id='back' value={cardInformation.back} onChange={handleChange} />
                    <button onClick={handleDoneAndCancelButtons} className='btn btn-secondary'>Done</button>
                    <button type='submit' className='btn btn-primary'>Save</button>
                </form>
            </div>

            :

            <div>
                <p><Link to={'/'} onClick={handleLinkClick}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} onClick={handleLinkClick}>{deckData.name}</Link> / Edit Card {cardId}</p>
                <h1>Edit Card</h1>
                <form onSubmit={handleSubmitEditCard}>
                    <label htmlFor='front'>Front</label>
                    <textarea type='text' name='front' id='front' value={cardInformation.front} onChange={handleChange} />
                    <label htmlFor='back'>Back</label>
                    <textarea type='text' name='back' id='back' value={cardInformation.back} onChange={handleChange} />
                    <button onClick={handleDoneAndCancelButtons} className='btn btn-secondary'>Cancel</button>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>


    )
}

export default AddOrEditCard;