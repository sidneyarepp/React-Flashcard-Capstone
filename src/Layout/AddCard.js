import React, { useEffect, useState } from 'react';
import AddAndEditCardForm from './AddAndEditCardForm';
import { useParams } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';

//This component handles the Add Card initial fetch and passes it down to the "AddAndEditCard" component.
function AddCard() {

    const [deckData, setDeckData] = useState({ name: '', description: '' })
    const [cardInformation, setCardInformation] = useState({ front: '', back: '' })
    const { deckId } = useParams();


    //The useEffect will set the deck state in the "index" component to match the deckId.  That state is then utilized by the "AddAndEditCardForm" component.
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

    function handleAddCardSubmit(e) {
        e.preventDefault();
        const { signal, abort } = new AbortController();

        createCard(deckId, cardInformation, signal)
            .then(
                setCardInformation({ front: '', back: '' })
            )
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
        <AddAndEditCardForm deckData={deckData} cardInformation={cardInformation} setCardInformation={setCardInformation} handleAddCardSubmit={handleAddCardSubmit} />
    )
}

export default AddCard;