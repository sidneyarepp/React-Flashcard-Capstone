import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { listDecks } from '../utils/api/index';
import AddOrEditCard from './AddOrEditCard';
import CardList from "./CardList";
import CreateDeck from './CreateDeck';
import EditDeck from "./EditDeck";
import DisplayDeckCards from "./DisplayDeckCards";
import DisplayStudyDeck from "./DisplayStudyDeck";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {

  const [cards, setCards] = useState([]);
  const [cardInformation, setCardInformation] = useState({ front: '', back: '' });
  const [cardSide, setCardSide] = useState('front');
  const [createDeckForm, setCreateDeckForm] = useState({ name: '', description: '' });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [decks, setDecks] = useState([]);
  const [deckData, setDeckData] = useState({ name: '', description: '' });

  useEffect(() => {
    const { signal, abort } = new AbortController();

    listDecks(signal).then(decksData => setDecks(decksData)).catch(error => {
      if (error.name === 'AbortError') {
        console.log('Fetch Aborted');
      } else {
        throw error;
      }
    })

    return () => abort;
  }, [])

  const addOrEditCardComponentAndProps = <AddOrEditCard deckData={deckData} setDeckData={setDeckData} cardInformation={cardInformation} setCardInformation={setCardInformation} setCurrentCardIndex={setCurrentCardIndex} setCardSide={setCardSide} />

  return (
    <section>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path='/' exact>
            <CardList decks={decks} setDecks={setDecks} />
          </Route>
          <Route path='/decks/new'>
            <CreateDeck createDeckForm={createDeckForm} setCreateDeckForm={setCreateDeckForm} />
          </Route>
          <Route path='/decks/:deckId' exact>
            <DisplayDeckCards cards={cards} setCards={setCards} deckData={deckData} setDeckData={setDeckData} />
          </Route>
          <Route path='/decks/:deckId/edit'>
            <EditDeck deckData={deckData} setDeckData={setDeckData} />
          </Route>
          <Route path='/decks/:deckId/study'>
            <DisplayStudyDeck cardSide={cardSide} setCardSide={setCardSide} deckData={deckData} setDeckData={setDeckData} cards={cards} setCards={setCards} cardInformation={cardInformation} setCardInformation={setCardInformation} currentCardIndex={currentCardIndex} setCurrentCardIndex={setCurrentCardIndex} />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            {addOrEditCardComponentAndProps}
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            {addOrEditCardComponentAndProps}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default Layout;
