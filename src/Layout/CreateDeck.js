import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createDeck } from '../utils/api/index';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

//This component is a sub-component of the 'CardList' component.  It handles the logic for when a user clicks the 'Create Deck' button.
function CreateDeck({ createDeckForm, setCreateDeckForm }) {

    const history = useHistory();

    //Universal form change handler for any input the user adds to the createDeck form.
    function handleChange(e) {
        setCreateDeckForm({ ...createDeckForm, [e.target.name]: e.target.value });
    }

    //Handler for if the user clicks the cancel button in the createDeck form.
    function handleCancel(e) {
        e.preventDefault();
        setCreateDeckForm({ name: '', description: '' });
        history.push('/');
    }

    //Submit handler for the createDeck form.
    function handleSubmit(event) {
        const { signal } = new AbortController();
        event.preventDefault();
        createDeck(createDeckForm, signal)
            .then(setCreateDeckForm({ name: '', description: '' }))
            .then(history.push('/'))
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Cancelled');
                } else {
                    throw error;
                }
            })
    }

    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / Create Deck</p>
            <h1>Create Deck</h1>
            <form className="border p-4 rounded">
                <label htmlFor='name' className="form-label">Name:</label>
                <input type='text' id='name' className="form-control" name='name' value={createDeckForm.name} onChange={handleChange} />
                <label htmlFor='description' className="form-label mt-2">Description</label>
                <textarea type='text' id='description' className="form-control" name='description' value={createDeckForm.description} onChange={handleChange} />
                <div className="mt-3">
                    <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                    <button className='btn btn-primary ml-2' type='submit' onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck;