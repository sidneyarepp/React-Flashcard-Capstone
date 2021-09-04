# React Flashcard Flashcard App

This app was the capstone project for the front end development portion of the Thinkful Software Engineering curriculum.  The app was built using React, JavaScript, and Bootstrap for the syling.

*This app utilizes a locally stored database which is not hosted online.  To see this app in action please clone it to your computer, run "npm install", and run "npm start".*

### Home Page
![flashcard-homepage](https://user-images.githubusercontent.com/56658340/132109875-e47a7506-069b-4db8-afa1-757b4a3b4ac6.png)

When the user comes to the site the first screen they see shows all of the decks currently in the database.  From there the user has the option to view a deck and all the cards in it, study a deck, delete any of the decks currently in the database, or create a new deck.

### Create Deck
![flashcard-create-deck](https://user-images.githubusercontent.com/56658340/132109891-f6029c4b-7a94-4b82-9727-1f12a77f2776.png)

When a user creates a deck they're initially creating a deck with no cards in it.  The "Create Deck" option allows the user to give the deck a name and a description.  Cards are added in the "View Deck" section.

### Delete Deck
<img width="441" alt="flashcard-delete-deck-alert" src="https://user-images.githubusercontent.com/56658340/132109897-c7aae931-78b0-4964-a3fe-6a317164f96f.png">

If a user chooses to delete a deck from the database they will be given a warning letting them know that the deck cannot be recovered once deleted.  After they make their choice they are taken back to the home page.

### View Deck
![flashcard-view-deck](https://user-images.githubusercontent.com/56658340/132109912-d7192d8d-ead9-4ddb-b49b-f61e6951eb8b.png)

The view deck section of the site is where the user is able to see all of the cards in a deck.  This section allows you to edit the deck (change the deck name or description), add a card (or cards), edit a card, delete a card, or study the deck.

### Edit Deck
![flashcard-editDeck](https://user-images.githubusercontent.com/56658340/132109937-b6d3c452-f421-413b-8286-027f45f59880.png)

Choosing to edit the deck takes the user to a screen where the information for that particular deck have already been filled in.  This allows the user to edit what is currently stored in the database for that deck.

### Add Card
![flashcard-add-card](https://user-images.githubusercontent.com/56658340/132109948-74f42ac1-1df0-4b41-ba72-1346f29ae641.png)

The add card feature allos the user to add as many new cards to a deck as they want.  The user is kept on the add card screen until they are finished adding cards, then they can click the "Done" button to go back to the "View Deck" screen for that deck.  Any new cards added will now show in the deck.

### Edit Card
![flashcard-edit-card](https://user-images.githubusercontent.com/56658340/132109970-925b2b84-553d-4be6-91a6-e064f7630860.png)

If a user chooses to edit a card they will be taken to a screen where all of the information for that card is already filled in.  Any edits made will reflect on the "View Deck" page when the user clicks the "Submit" button.

### Delete Card
<img width="442" alt="flashcard-card-deleteCard" src="https://user-images.githubusercontent.com/56658340/132109990-c8d2c574-b872-4ccd-ab3c-752c2875db5d.png">

If a user chooses to delete a card they will be given a prompt asking them if they're sure they want to delete the card.  Regardless of their choice they will stay on the "View Deck" page.

### Study Deck - Card Front
![flashcard-study-start-frontOfCard](https://user-images.githubusercontent.com/56658340/132109999-8b96a089-337c-41b1-8193-ca2291a12e79.png)

When a user chooses to study a deck they will be brought to the "Study Deck" section.  They will start on card 1, on the front of that card.  The current card number they are on, as well as the total number of cards, is displayed.  The see the answer for the question on the front of the card the user can click the "Flip" button.

### Study Deck - Card Back
![flashcard-study-start-backOfCard](https://user-images.githubusercontent.com/56658340/132110015-7e90e8ff-29db-4782-8690-77fc5cccb2bc.png)

The back of the card will display the answer for the question on the front of the card, as well as showing a "Next" button.  The user can repeat this process until they get to the end of the deck.

### Study Deck - End of Deck
<img width="439" alt="flashcard-study-endOfDeckAlert" src="https://user-images.githubusercontent.com/56658340/132110037-039c41fe-d66b-4278-bed9-fe2790393a13.png">

When a user gets to the end of a study deck they are given a prompt asking them if they want to study the deck again.  If the user chooses "OK" they will go back to the first card in that deck.  If they choose "Cancel" they will be taken back to the home page where all of the decks are displayed.
