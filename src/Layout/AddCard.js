import React, { useEffect } from 'react';
import AddAndEditCardForm from './AddAndEditCardForm';
import { useParams, useRouteMatch } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';

//This component handles the Add Card functionality.
function AddOrEditCard({ deckData, setDeckData, cardInformation, setCardInformation, handleDoneAndCancelButton, handleLinkClick, handleChange }) {

    const { deckId } = useParams();
    const { url } = useRouteMatch();

    //The useEffect will set the deck state to match the deckId.  
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

        return () => abort;
    }, [deckId, setDeckData])

    //Submit handler for when the user is adding a new card to the deck.
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


    return (
        <AddAndEditCardForm deckData={deckData} cardInformation={cardInformation} handleLinkClick={handleLinkClick} handleChange={handleChange} handleDoneAndCancelButton={handleDoneAndCancelButton} deckId={deckId} handleSubmitAddCard={handleSubmitAddCard} url={url} />
    )
}

export default AddOrEditCard;