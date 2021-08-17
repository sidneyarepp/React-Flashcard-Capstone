import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import StudyCard from './StudyCard';
import NotEnoughCards from './NotEnoughCards';

//This component handles the rendering for when the user clicks the 'Study' button on the home page or view deck screens.
function DisplayStudyDeck({ deckData, setDeckData }) {

    const [cards, setCards] = useState([]);
    const [cardSide, setCardSide] = useState('front');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const { deckId } = useParams();
    const currentCard = cards[currentCardIndex]

    //When the component is mounted the state deckData and cards are set based on the deck the user chooses to study.  The inital card shown will always be the first in the deck.
    useEffect(() => {
        const { signal } = new AbortController();

        readDeck(deckId, signal)
            .then(deckInformation => {
                setDeckData(deckInformation);
                setCards(deckInformation.cards);
            }
            )
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted')
                } else {
                    throw error
                }
            })
    }, [deckId, setCards, setDeckData])

    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`}>{deckData.name}</Link> / Study</p>
            <h1 className="mb-4">Study: {deckData.name}</h1>
            {cards.length > 2 ?
                <StudyCard deckData={deckData} currentCardIndex={currentCardIndex} setCurrentCardIndex={setCurrentCardIndex} currentCard={currentCard} cards={cards} cardSide={cardSide} setCardSide={setCardSide} />
                :
                <NotEnoughCards cardsQuantity={cards.length} />
            }
        </div>
    )
}

export default DisplayStudyDeck;