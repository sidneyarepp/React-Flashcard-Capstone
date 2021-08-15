import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import StudyCard from './StudyCard';
import NotEnoughCards from './NotEnoughCards';

//This component handles the rendering for when the user clicks the 'Study' button on the home page or view deck screens.
function DisplayStudyDeck({ cardSide, setCardSide, deckData, setDeckData, cards, setCards, cardInformation, setCardInformation, currentCardIndex, setCurrentCardIndex }) {

    const { deckId } = useParams();
    const history = useHistory();

    //When the component is mounted the state deckData, cards, and cardInformation are set based on the deck the user chooses to study.  The inital card shown will always be the first in the deck.
    useEffect(() => {
        const { signal } = new AbortController();

        readDeck(deckId, signal)
            .then(deckInformation => {
                setDeckData(deckInformation);
                setCards(deckInformation.cards);
                setCardInformation(deckInformation.cards[currentCardIndex]);
            }
            )
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch Aborted')
                } else {
                    throw error
                }
            })
    }, [deckId, currentCardIndex, setCardInformation, setCards, setDeckData])

    //Click handler for when the user clicks on any of the breadcrumb links to make sure the cardInformation state is reset in case someone needs to add a new card or edit an existing card.
    function handleLinkClick() {
        setCardInformation({ front: '', back: '' });
        setCurrentCardIndex(0);
        setCardSide('front');
    }

    return (
        <div>
            <p className="bg-light p-2 rounded"><Link to={'/'} onClick={handleLinkClick}><FontAwesomeIcon icon={faHome} /> Home</Link> / <Link to={`/decks/${deckId}`} onClick={handleLinkClick}>{deckData.name}</Link> / Study</p>
            <h1 className="mb-4">Study: {deckData.name}</h1>
            {cards.length > 2 ?
                <StudyCard deckData={deckData} currentCardIndex={currentCardIndex} setCurrentCardIndex={setCurrentCardIndex} cardInformation={cardInformation} cards={cards} history={history} cardSide={cardSide} setCardSide={setCardSide} setCardInformation={setCardInformation} />
                :
                <NotEnoughCards cardsQuantity={cards.length} />
            }
        </div>
    )
}

export default DisplayStudyDeck;