import React, { useEffect } from 'react';
import Card from './Card';
import { listDecks } from "../utils/api";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//This component handles loading the home page decks found in the database.
function CardList({ decks, setDecks }) {

  const history = useHistory();

  //This sets the decks state to be all of the decks found in the database.
  useEffect(() => {
    const signal = new AbortController().signal;

    listDecks(signal)
      .then(decksInformation => setDecks(decksInformation))
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch Aborted')
        } else {
          throw error
        }
      })
  }, [setDecks])

  //Handler for when the user clicks on the 'Create Deck' button.
  function handleCreateClick() {
    history.push('/decks/new')
  }

  //Handler to delete the deck in state the customer chooses to delete.  This triggers a re-render to update the card list.
  function deleteDeckInState(id) {
    setDecks(decks.filter(deck => deck.id !== id))
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row">
        <button className="btn btn-lg btn-secondary mb-3" onClick={handleCreateClick}>
          <FontAwesomeIcon icon={faPlus} /> Create Deck
        </button>
      </div>
      {decks.map((deck) => (
        <div className="d-flex flex-row mb-3" key={deck.id}>
          <Card
            deleteDeckInState={deleteDeckInState}
            deck={deck}
          />
        </div>
      ))}
    </div>
  );
}

export default CardList;
