import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import StudyCard from './StudyCard';
import NotEnoughCards from './NotEnoughCards';

function DisplayStudyDeck() {
    const [deckData, setDeckData] = useState({});
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const { deckId } = useParams();

    useEffect(() => {
        const { signal } = new AbortController();

        readDeck(deckId, signal).then(deckInformation => {
            setDeckData(deckInformation);
            setCards(deckInformation.cards);
            setCurrentCard(deckInformation.cards[currentCardIndex]);
        }
        ).catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Aborted')
            } else {
                throw error
            }
        })
    }, [deckId, currentCardIndex])

    return (
        <div>
            <p><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`}>{deckData.name}</Link> / Study</p>
            <p>Study: {deckData.name}</p>
            {cards.length > 2 ?
                <StudyCard deckData={deckData} currentCardIndex={currentCardIndex} setCurrentCardIndex={setCurrentCardIndex} currentCard={currentCard} cards={cards} />
                :
                <NotEnoughCards cardsQuantity={cards.length} />
            }
        </div>
    )
}

export default DisplayStudyDeck;