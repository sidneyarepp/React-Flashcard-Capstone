import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

//This component handles the structure and logic for when a user creates or edits an existing deck.
function DeckForm({ formDeckData, handleEditSubmit, handleCreateSubmit, setFormDeckData }) {

    const history = useHistory();
    const { url } = useRouteMatch();
    const creating = url.includes('new');

    //Change handler for the name state.
    function handleChange(e) {
        setFormDeckData({ ...formDeckData, [e.target.name]: e.target.value });
    };

    //Handler for if the user clicks the cancel button.
    function handleCancel(e) {
        e.preventDefault();
        history.push('/');
    }

    return (
        <div>
            <form className="border p-4 rounded" onSubmit={creating ? handleCreateSubmit : handleEditSubmit}>
                <label htmlFor='name' className="form-label">Name:</label>
                <input type='text' id='name' className="form-control" name='name' value={formDeckData.name} onChange={handleChange} required />
                <label htmlFor='description' className="form-label mt-2">Description:</label>
                <textarea type='text' id='description' className="form-control" name='description' value={formDeckData.description} onChange={handleChange} required />
                <div className="mt-3">
                    <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                    <button className='btn btn-primary ml-2' type='submit' >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default DeckForm;