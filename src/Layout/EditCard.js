import React, { useEffect } from 'react';
import AddAndEditCardForm from './AddAndEditCardForm';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';

//This component handles the Add Card and Edit Card functionality.
function AddOrEditCard({ deckData, setDeckData, cardInformation, setCardInformation, handleDoneAndCancelButton, handleLinkClick, handleChange }) {

    const history = useHistory();
    const { deckId, cardId } = useParams();
    const { url } = useRouteMatch();

    //The useEffect will set the deck state to match the deckId, as well as setting the currentCard state so the front and back data will be pre-filled in the edit form.
    useEffect(() => {
        const { signal, abort } = new AbortController();

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


        return () => abort;
    }, [deckId, setDeckData, setCardInformation, cardId])


    //Submit handler for when the user is editing an existing deck.
    function handleSubmitEditCard(e) {
        e.preventDefault();
        updateCard(cardInformation)
            .then(setCardInformation({ front: '', back: '' }))
            .then(history.push(`/decks/${deckId}`))
    }


    return (
        <AddAndEditCardForm deckData={deckData} cardInformation={cardInformation} handleDoneAndCancelButton={handleDoneAndCancelButton} handleLinkClick={handleLinkClick} handleChange={handleChange} deckId={deckId} cardId={cardId} handleSubmitEditCard={handleSubmitEditCard} url={url} />
    )
}

export default AddOrEditCard;