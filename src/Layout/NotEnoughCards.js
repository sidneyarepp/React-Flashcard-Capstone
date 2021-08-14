import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function NotEnoughCards({ cardsQuantity }) {
    const { deckId } = useParams();

    return (
        <div>
            <h2>Not enough cards</h2>
            <p>You need at least 3 cards to study.  There {cardsQuantity === 1 ? `is 1 card` : `are ${cardsQuantity} cards`} in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> <span>Add Cards</span></Link>
        </div>
    )
}

export default NotEnoughCards;