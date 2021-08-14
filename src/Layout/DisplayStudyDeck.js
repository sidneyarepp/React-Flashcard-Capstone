import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import StudyCard from './StudyCard';
import NotEnoughCards from './NotEnoughCards';

function DisplayStudyDeck({ cardSide, setCardSide, deckData, setDeckData, cards, setCards, cardInformation, setCardInformation, currentCardIndex, setCurrentCardIndex }) {

    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const { signal } = new AbortController();

        readDeck(deckId, signal).then(deckInformation => {
            setDeckData(deckInformation);
            setCards(deckInformation.cards);
            setCardInformation(deckInformation.cards[currentCardIndex]);
        }
        ).catch(error => {
            if (error.name === 'AbortError') {
                console.log('Fetch Aborted')
            } else {
                throw error
            }
        })
    }, [deckId, currentCardIndex, setCardInformation, setCards, setDeckData])

    return (
        <div>
            <p><Link to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`}>{deckData.name}</Link> / Study</p>
            <p>Study: {deckData.name}</p>
            {cards.length > 2 ?
                <StudyCard deckData={deckData} currentCardIndex={currentCardIndex} setCurrentCardIndex={setCurrentCardIndex} cardInformation={cardInformation} cards={cards} history={history} cardSide={cardSide} setCardSide={setCardSide} />
                :
                <NotEnoughCards cardsQuantity={cards.length} />
            }
        </div>
    )
}

export default DisplayStudyDeck;