import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

//This component is a sub-component of the 'DisplayDeckCards' component.  It handles the functionality for when a user clicks the 'Edit' button for the deck..
function EditDeck({ deckData, setDeckData }) {

    const { deckId } = useParams();
    const history = useHistory();


    useEffect(() => {
        const { signal, abort } = new AbortController();

        //When the component mounts the deckData state is updated to reflect the deck chosen by the user.
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

    //Universal change handler for the editDeck form.
    function handleChange(e) {
        setDeckData({ ...deckData, [e.target.name]: e.target.value })
    }

    //Form submission handler for the editDeck component.
    function handleSubmit(e) {
        e.preventDefault();
        const { signal } = new AbortController();

        updateDeck(deckData, signal)
            .then(setDeckData(deckData))
            .then(history.push(`/decks/${deckId}`))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    throw error;
                }
            })
    }

    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} >{deckData.name}</Link> / Edit Deck</p>
            <h1 className="mb-3">Edit Deck</h1>
            <form onSubmit={handleSubmit} className="border p-4 rounded">
                <label htmlFor='name' className="form-label">Name</label>
                <input type='text' className="form-control" name='name' id='name' onChange={handleChange} value={deckData.name} />
                <label htmlFor='description' className="form-label">Description</label>
                <textarea type='text' className="form-control" name='description' id='description' onChange={handleChange} value={deckData.description} />
                <div className="mt-3">
                    <Link to={`/decks/${deckId}`} className='btn btn-secondary'>Cancel</Link>
                    <button type='submit' className='btn btn-primary ml-2'>Submit</button>
                </div>
            </form>
        </div >
    )
}

export default EditDeck;