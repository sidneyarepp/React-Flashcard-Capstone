import React, { useState, useEffect } from "react";
import AddCard from './AddCard';
import CardList from "./CardList";
import CreateDeck from './CreateDeck';
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";
import DisplayDeckCards from "./DisplayDeckCards";
import DisplayStudyDeck from "./DisplayStudyDeck";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import { listDecks } from '../utils/api/index';

function Layout() {

  const [decks, setDecks] = useState([]);
  const [deckInfo, setDeckInfo] = useState({});

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
            <CreateDeck />
          </Route>
          <Route path='/decks/:deckId' exact>
            <DisplayDeckCards />
          </Route>
          <Route path='/decks/:deckId/edit'>
            <EditDeck setDeckInfo={setDeckInfo} />
          </Route>
          <Route path='/decks/:deckId/study'>
            <DisplayStudyDeck />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            <AddCard />
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
