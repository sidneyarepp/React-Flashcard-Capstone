import React, { useEffect } from 'react';
import { Link, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import { readDeck, readCard, createCard, updateCard } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

//This component handles the Add Card and Edit Card functionality.
function AddOrEditCard({ deckData, setDeckData, cardInformation, setCardInformation, setCurrentCardIndex, setCardSide }) {

    const { deckId, cardId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();

    //If the user is creating a new card the useEffect will set the deck state to match the deckId.  If the user is editing an existing card the useEffect will set the deck state to match the deckId. as well as setting the currentCard state so the front and back data will be pre-filled in the edit form.

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

    //Change handler to make the form a controlled form.
    function handleChange(e) {
        setCardInformation({ ...cardInformation, [e.target.name]: e.target.value });
    }

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

    //Submit handler for when the user is editing an existing deck.
    function handleSubmitEditCard(e) {
        e.preventDefault();
        updateCard(cardInformation)
            .then(setCardInformation({ front: '', back: '' }))
            .then(history.push(`/decks/${deckId}`))
    }

    //Handler to reset the cardInformation state if a customer clicks the Done button when adding cards, or the Cancel button when editing an existing card.
    function handleDoneAndCancelButtons(e) {
        e.preventDefault();
        setCardInformation({ front: '', back: '' });
        history.push(`/decks/${deckId}`);
    }

    //Click handler to reset the cardInformation state, currentCardIndex, and cardSide if the user chooses to navigate back to the deck or the home page using the breadcrumb links.
    function handleLinkClick() {
        setCardInformation({ front: '', back: '' });
        setCurrentCardIndex(0);
        setCardSide('front');
    }

    return (
        url.includes('new')

            ?
            //This is what is rendered if the customer is adding a new card.
            <div>
                <p className="bg-light p-2 rounded"><Link to={'/'} onClick={handleLinkClick}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} onClick={handleLinkClick}>{deckData.name}</Link> / <span>Add Card</span></p>
                <h1 className="mb-3">{deckData.name}: <span>Add Card</span></h1>
                <form onSubmit={handleSubmitAddCard} className="border p-4 rounded">
                    <label htmlFor='front' className="form-label">Front</label>
                    <textarea type='text' className="form-control" name='front' id='front' value={cardInformation.front} onChange={handleChange} />
                    <label htmlFor='back' className="form-label">Back</label>
                    <textarea type='text' className="form-control" name='back' id='back' value={cardInformation.back} onChange={handleChange} />
                    <div className="mt-3">
                        <button onClick={handleDoneAndCancelButtons} className='btn btn-secondary'>Done</button>
                        <button type='submit' className='btn btn-primary ml-2'>Save</button>
                    </div>
                </form>
            </div>

            :

            //This is what is rendered if the customer is editing an existing card.
            <div>
                <p className="bg-light p-2 rounded"><Link to={'/'} onClick={handleLinkClick}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} onClick={handleLinkClick}>{deckData.name}</Link> / Edit Card {cardId}</p>
                <h1 className="mb-3">Edit Card</h1>
                <form onSubmit={handleSubmitEditCard} className="border p-4 rounded">
                    <label htmlFor='front' className="form-label">Front</label>
                    <textarea type='text' className="form-control" name='front' id='front' value={cardInformation.front} onChange={handleChange} />
                    <label htmlFor='back' className="form-label mt-2">Back</label>
                    <textarea type='text' className="form-control" name='back' id='back' value={cardInformation.back} onChange={handleChange} />
                    <div className="mt-3">
                        <button onClick={handleDoneAndCancelButtons} className='btn btn-secondary'>Cancel</button>
                        <button type='submit' className='btn btn-primary ml-2'>Submit</button>
                    </div>
                </form>
            </div>


    )
}

export default AddOrEditCard;