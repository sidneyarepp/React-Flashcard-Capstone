import React, { useEffect, useState } from 'react';
import AddAndEditCardForm from './AddAndEditCardForm';
import { useHistory, useParams } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';

//This component handles the Edit Card structure and card inforamtion state.
function AddOrEditCard() {

    const [deckData, setDeckData] = useState({ name: '', description: '' })
    const [cardInformation, setCardInformation] = useState({ front: '', back: '' });
    const { deckId, cardId } = useParams();
    const history = useHistory();

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
        const { signal, abort } = new AbortController();

        updateCard(cardInformation, signal)
            .then(() => history.push(`/decks/${deckId}`))
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
        <AddAndEditCardForm deckData={deckData} cardInformation={cardInformation} setCardInformation={setCardInformation} handleSubmitEditCard={handleSubmitEditCard} />
    )
}

export default AddOrEditCard;