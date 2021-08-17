import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { listDecks } from '../utils/api/index';
import AddCard from './AddCard';
import CardList from "./CardList";
import CreateDeck from './CreateDeck';
import EditCard from './EditCard';
import EditDeck from "./EditDeck";
import DisplayDeckCards from "./DisplayDeckCards";
import DisplayStudyDeck from "./DisplayStudyDeck";
import Header from "./Header";
import NotFound from "./NotFound";


//This component holds the routing logic and two pieces of universal state needed.
function Layout() {

  const [decks, setDecks] = useState([]);
  const [deckData, setDeckData] = useState({ name: '', description: '' });

  //When the user visits the site home page the decks state is set to all decks currently found in the database.
  useEffect(() => {
    const { signal, abort } = new AbortController();

    listDecks(signal)
      .then(decksData => setDecks(decksData))
      .catch(error => {
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
        <Switch>
          <Route path='/' exact>
            <CardList decks={decks} setDecks={setDecks} />
          </Route>
          <Route path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route path='/decks/:deckId' exact>
            <DisplayDeckCards deckData={deckData} setDeckData={setDeckData} />
          </Route>
          <Route path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route path='/decks/:deckId/study'>
            <DisplayStudyDeck deckData={deckData} setDeckData={setDeckData} />
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
