import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

//This component handles the Add Card functionality.
function AddOrEditCard({ deckData, setDeckData, cardInformation, setCardInformation, setCurrentCardIndex, setCardSide }) {

    const { deckId } = useParams();
    const history = useHistory();

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

    //Handler to reset the cardInformation state if a customer clicks the Done button when adding cards.
    function handleDoneButton(e) {
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
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'} onClick={handleLinkClick}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} onClick={handleLinkClick}>{deckData.name}</Link> / <span>Add Card</span></p>
            <h1 className="mb-3">{deckData.name}: <span>Add Card</span></h1>
            <form onSubmit={handleSubmitAddCard} className="border p-4 rounded">
                <label htmlFor='front' className="form-label">Front</label>
                <textarea type='text' className="form-control" name='front' id='front' value={cardInformation.front} onChange={handleChange} />
                <label htmlFor='back' className="form-label">Back</label>
                <textarea type='text' className="form-control" name='back' id='back' value={cardInformation.back} onChange={handleChange} />
                <div className="mt-3">
                    <button onClick={handleDoneButton} className='btn btn-secondary'>Done</button>
                    <button type='submit' className='btn btn-primary ml-2'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddOrEditCard;