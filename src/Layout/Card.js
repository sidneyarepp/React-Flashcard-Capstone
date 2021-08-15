import React from 'react';
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEye, faBook } from "@fortawesome/free-solid-svg-icons";

function Card({ deck, deleteDeckInState }) {
  const { id, name, description, cards } = deck;
  const { signal } = new AbortController();

  //Delete handler for if/when the customer clicks on the delete button on the home page.
  function handleDelete() {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if (result) {
      deleteDeck(id, signal).then(deleteDeckInState(id)).catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch Aborted')
        } else {
          throw error
        }
      })
    }
  }

  return (
    <div className="card" style={{ width: "30em" }}>
      <div className="card-body">
        <div className="row">
          <h5 className="card-title col col-9">{name}</h5>
          <span className="col col-3 text-right">{cards.length} cards</span>
        </div>
        <p className="card-text">{description}</p>
        <div className="row">
          <div className="col col-9">
            <Link to={`/decks/${id}`} className="card-link">
              <button type="button" className="btn btn-secondary">
                View <FontAwesomeIcon icon={faEye} />
              </button>
            </Link>
            <Link to={`/decks/${id}/study`} className="card-link">
              <button type="button" className="btn btn-primary">
                Study <FontAwesomeIcon icon={faBook} />
              </button>
            </Link>
          </div>
          <div className="col col-3 text-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
