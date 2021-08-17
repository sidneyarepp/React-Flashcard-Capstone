import React from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

//Component for the form and form logic used by the "AddCard" and "EditCard" components.
function AddAndEditCardForm({ deckData, cardInformation, setCardInformation, handleAddCardSubmit, handleSubmitEditCard }) {

    const { deckId, cardId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();
    const addingCard = url.includes('new');
    const cardVerb = addingCard ? 'Add Card' : `Edit Card ${cardId}`;

    //Change handler for the name state.
    function handleChange(e) {
        setCardInformation({ ...cardInformation, [e.target.name]: e.target.value });
    };

    //Handle the "Done" and "Cancel" buttons to send the user back to the view deck page they were on.
    function handleDoneAndCancelButton() {
        history.push(`/decks/${deckId}`);
    }


    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`}>{deckData.name}</Link> / {cardVerb}</p>
            <h1 className="mb-3">{deckData.name}: <span>{cardVerb}</span></h1>
            <form onSubmit={addingCard ? handleAddCardSubmit : handleSubmitEditCard} className="border p-4 rounded">
                <label htmlFor='front' className="form-label">Front</label>
                <textarea type='text' className="form-control" name='front' id='front' value={cardInformation.front} onChange={handleChange} required />
                <label htmlFor='back' className="form-label">Back</label>
                <textarea type='text' className="form-control" name='back' id='back' value={cardInformation.back} onChange={handleChange} required />
                <div className="mt-3">
                    <button onClick={handleDoneAndCancelButton} className='btn btn-secondary'>{addingCard ? 'Done' : 'Cancel'}</button>
                    <button type='submit' className='btn btn-primary ml-2'>{addingCard ? 'Save' : 'Submit'}</button>
                </div>
            </form>
        </div>
    )
}

export default AddAndEditCardForm;




