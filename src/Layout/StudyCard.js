import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function StudyCard({ deckData, currentCardIndex, setCurrentCardIndex, cards, currentCard }) {
    const [cardSide, setCardSide] = useState('front');
    const history = useHistory();

    function handleCardFlip() {
        if (cardSide === 'front') {
            setCardSide('back')
        } else {
            setCardSide('front')
        }
    }

    function handleNextCard() {
        if (currentCardIndex < deckData.cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setCardSide('front');
        } else {
            const response = window.confirm('Restart cards?\n\nClick "Cancel" to return to the home page.')
            if (response) {
                setCurrentCardIndex(0);
                setCardSide('front');
            } else {
                history.push('/')
            }
        }
    }

    if (cardSide === 'front') {
        return (
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h3>Card {currentCardIndex + 1} of {cards.length}</h3>
                    <h5 className="card-title">{currentCard.title}</h5>
                    <p className="card-text">{currentCard.front}</p>
                    <button className="btn btn-secondary" onClick={handleCardFlip}>Flip</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h3>Card {currentCardIndex + 1} of {deckData.cards.length}</h3>
                    <h5 className="card-title">{currentCard.title}</h5>
                    <p className="card-text">{currentCard.back}</p>
                    <button className="btn btn-secondary" onClick={handleCardFlip}>Flip</button>
                    <button className="btn btn-primary" onClick={handleNextCard}>Next</button>
                </div>
            </div>
        )
    }
}

export default StudyCard;