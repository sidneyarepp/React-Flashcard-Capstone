import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createDeck } from '../utils/api/index';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function CreateDeck({ createDeckForm, setCreateDeckForm }) {

    const history = useHistory();

    function handleChange(e) {
        setCreateDeckForm({ ...createDeckForm, [e.target.name]: e.target.value });
    }

    function handleCancel() {
        history.push('/');
    }

    function handleSubmit(event) {
        const { signal } = new AbortController();
        event.preventDefault();
        createDeck(createDeckForm, signal).then(history.push('/')).catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Cancelled');
            } else {
                throw error;
            }
        })
    }

    return (
        <div>
            <p><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / Create Deck</p>
            <h1>Create Deck</h1>
            <form>
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' value={createDeckForm} onChange={handleChange} />
                <label htmlFor='description'>Description</label>
                <textarea type='text' id='description' name='description' value={createDeckForm} onChange={handleChange} />
                <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                <button className='btn btn-primary' type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;