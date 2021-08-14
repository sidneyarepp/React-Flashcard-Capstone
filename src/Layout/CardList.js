import React, { useEffect } from 'react';
import Card from './Card';
import { listDecks } from "../utils/api";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CardList({ decks, setDecks }) {

  const history = useHistory();

  useEffect(() => {
    const signal = new AbortController().signal;

    listDecks(signal).then(deckInformation => setDecks(deckInformation)).catch(error => {
      if (error.name === 'AbortError') {
        console.log('Fetch Aborted')
      } else {
        throw error
      }
    })
  }, [setDecks])

  function handleCreateClick() {
    history.push('/decks/new')
  }

  function deleteDeckInState(id) {
    setDecks(decks.filter(deck => deck.id !== id))
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row">
        <button className="btn btn-lg btn-secondary mb-2" onClick={handleCreateClick}>
          <FontAwesomeIcon icon={faPlus} /> Create Deck
        </button>
      </div>
      {decks.map((deck) => (
        <div className="d-flex flex-row mb-2" key={deck.id}>
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
