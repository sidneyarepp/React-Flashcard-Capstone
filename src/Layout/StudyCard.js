import React from 'react';
import { useHistory } from 'react-router-dom';

//This is a sub-component of the 'DisplayStudyDeck' component.  It handles the styling and functionality of the cards.
function StudyCard({ deckData, currentCardIndex, setCurrentCardIndex, cards, cardSide, setCardSide, currentCard }) {

    const history = useHistory();
    const cardsideFront = cardSide === 'front';

    //Handler for which side of the card is displayed when the user clicks the 'Flip' button.
    function handleCardFlip() {
        if (cardSide === 'front') {
            setCardSide('back')
        } else {
            setCardSide('front')
        }
    }

    //Handler for when the user clicks the 'Next' button.  If the card isn't the last in the deck it goes to the next card.  If the card is the last in the deck the user gets an option to start over, or cancel and return to the home page.
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

    //Conditional logic to handle the card rendering based on the state variable 'cardSide'.
    return (
        <div className="card" style={{ width: "30rem" }}>
            <div className="card-body">
                <h4>Card {currentCardIndex + 1} of {cards.length}</h4>
                <p className="card-text">{cardsideFront ? currentCard.front : currentCard.back}</p>
                <button className="btn btn-secondary" onClick={handleCardFlip}>Flip</button>
                {!cardsideFront && <button className="btn btn-primary ml-2" onClick={handleNextCard}>Next</button>}
            </div>
        </div>
    )

}

export default StudyCard;