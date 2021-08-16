import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function AddAndEditCardForm({ deckData, cardInformation, handleLinkClick, handleChange, handleDoneAndCancelButton, deckId, cardId, handleSubmitAddCard, handleSubmitEditCard, url }) {

    function doneAndCancelClick(e) {
        handleDoneAndCancelButton(e, deckId)
    }

    const addingCard = url.includes('new')

    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'} onClick={handleLinkClick}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} onClick={handleLinkClick}>{deckData.name}</Link> / {addingCard ? <span>Add Card</span> : `Edit Card ${cardId}`}</p>
            <h1 className="mb-3">{deckData.name}: <span>Add Card</span></h1>
            <form onSubmit={addingCard ? handleSubmitAddCard : handleSubmitEditCard} className="border p-4 rounded">
                <label htmlFor='front' className="form-label">Front</label>
                <textarea type='text' className="form-control" name='front' id='front' value={cardInformation.front} onChange={handleChange} />
                <label htmlFor='back' className="form-label">Back</label>
                <textarea type='text' className="form-control" name='back' id='back' value={cardInformation.back} onChange={handleChange} />
                <div className="mt-3">
                    <button onClick={doneAndCancelClick} className='btn btn-secondary'>{addingCard ? 'Done' : 'Cancel'}</button>
                    <button type='submit' className='btn btn-primary ml-2'>{addingCard ? 'Save' : 'Submit'}</button>
                </div>
            </form>
        </div>
    )
}

export default AddAndEditCardForm;




