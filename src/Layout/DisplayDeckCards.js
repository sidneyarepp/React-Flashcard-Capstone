import React, { useEffect } from 'react';
import { Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt, faBook, faPlus, faHome } from "@fortawesome/free-solid-svg-icons";
import DeckCard from './DeckCard';


function DisplayDeckCards({ deckData, setDeckData, cards, setCards }) {
    const { id, name, description } = deckData;
    const history = useHistory();
    const { deckId } = useParams();
    const { url } = useRouteMatch();

    function deleteCardInState(id) {
        setCards(cards.filter(card => card.id !== id));
    }

    function handleDeleteDeck() {
        const { signal, abort } = new AbortController();
        const response = window.confirm('Delete this deck?\n\nYou will not be able to recover it.')
        if (response) {
            deleteDeck(id, signal).then(history.push('/')).catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted')
                } else {
                    throw error
                }
            })
        }
        return () => abort;
    }

    useEffect(() => {
        const { signal, abort } = new AbortController();

        readDeck(deckId, signal).then(data => {
            setDeckData(data);
            setCards(data.cards);
        });

        return () => abort;
    }, [deckId, setCards, setDeckData])

    return (
        <div>
            <p><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / {deckData.name}</p>
            <h3>{name}</h3>
            <p>{description}</p>
            <Link to={`${url}/edit`} className="btn btn-secondary"><FontAwesomeIcon icon={faPencilAlt} /> Edit</Link>
            <Link to={`${url}/study`} className="btn btn-primary"><FontAwesomeIcon icon={faBook} /> Study</Link>
            <Link to={`${url}/cards/new`} className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Cards</Link>
            <button type='button' className="btn btn-danger" onClick={handleDeleteDeck}><FontAwesomeIcon icon={faTrashAlt} /></button>
            <h2>Cards</h2>
            {cards.map(card => <DeckCard card={card} key={card.id} deleteCardInState={deleteCardInState} url={url} />)}
        </div>
    )
}

export default DisplayDeckCards;