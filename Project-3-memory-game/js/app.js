/*
 * Create a list that holds all of your cards
 */

const cardsArray = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", 
                    "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-bomb", "fa fa-bomb", 
                    "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle"];


const cardsParent = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const init = () => {
    let cardsShuffled = shuffle(cardsArray);
    // let cardsShuffled = cardsArray;
    for(let i = 0; i < cardsShuffled.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${cardsShuffled[i]}"></i>`;
        cardsParent.appendChild(card);
    
        // add click event to each card... invoke click function
        clickEvent(card);
    }
}

let isFirstClick = true;


/*
* Click event
*/

const clickEvent = (card) => {
    card.addEventListener("click", function() {

        /* 
        * we need to write a condition that checks if we already have
        * a clicked card. recall that we need to store just two cards in the
        * openedCard array.
        */
        if(isFirstClick){
            startTimer();
            
            isFirstClick = false;
        }

       const currentCard = this;
       const previousCard = openedCards[0];

       if(openedCards.length === 1) {

            // here we already have a clicked card
            card.classList.add("open", "show", "disabled");
            openedCards.push(this);

            // we need to compare the cards
            compareCards(currentCard, previousCard);

       } else {
           // here we don't have an already clicked card
            currentCard.classList.add("open", "show", "disabled");
            openedCards.push(this);
       }
    });
}

/*
* compare the two cards to see if they match or not
* add new moves if they do not match
*/

const compareCards = (currentCard, previousCard) => {

    if(currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        //check if cards are matched
    }else {

        // before the wrong matched card is removed, we need to see it for 
        // 2 seconds... hence the setTimeout function
        previousCard.classList.add("unmatch");
        currentCard.classList.add("unmatch");
        setTimeout(function() {
            // It's much better to move all this to a function and call it here closeUnmatchedCards();
 
            previousCard.classList.remove("unmatch", "open", "show", "disabled");
            currentCard.classList.remove("unmatch", "open", "show", "disabled");
            openedCards = [];
        }, 400);
    }

    //add new move
    addMove();
    addTotalMove();
    isOver();
}
// Function can be here function closeUnmatchedCards() {}

/*
* Check if the game is over
*/
const isOver = () => {
    if (matchedCards.length === cardsArray.length) {
        stopTimer();
        toggleModal();
    }
}

/*
* Restart Icon
*/

const restartIcon = document.querySelector(".restart");
restartIcon.addEventListener("click", function() {
    //Three things to be done when the restart icon is clicked
    // 1. delete all cards
    cardsParent.innerHTML = "";
    // 2. create new cards by calling init()
    init();
    // 3. reset all related variables like the timer, 
    // rating, saved matched cards and moves
    reset();
    
})

/*
 * Moves & totalMoves
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
//movesContainer.innerHTML = 0; <= not needed because there's already a 
// span class in the HTML with "0"
const addMove = () => {
    moves++;
    movesContainer.innerHTML = moves;

    //call the rating function
    rating();
    totalRating();
}

const totalMovesContainer = document.querySelector(".total-moves");
let totalMoves = 0;
const addTotalMove = () => {
    totalMoves++;
    totalMovesContainer.innerHTML = totalMoves;
    

    rating();
    totalRating();
}

/*
 * Ratings
*/
const ratingsContainer = document.querySelector(".stars");
const stars = `<li><i class="fa fa-star"></i></li>`;
ratingsContainer.innerHTML = stars + stars + stars;

const rating = () => {
    if (moves <= 10) {
        ratingsContainer.innerHTML = stars + stars + stars;
    } else if (moves <= 14) {
        ratingsContainer.innerHTML = stars + stars;
    } else {
        ratingsContainer.innerHTML = stars;
    }
}

/*
 * Timer
*/

const timerContainer = document.querySelector(".timer");
const totalTimeContainer = document.querySelector(".total-time");
let gameTimer, seconds = 0, totalSeconds = 0;

timerContainer.innerHTML = seconds + 's';
totalTimeContainer.innerHTML = totalSeconds + 's';

const startTimer = () => {
    gameTimer = setInterval(function() {
        // Increase the seconds by 1
        seconds++;
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = seconds + 's';
        totalTimeContainer.innerHTML = totalSeconds + 's';
    }, 1000);

}

const stopTimer = () => {
    clearInterval(gameTimer);
}

const reset = () => {
    // matched cards
    matchedCards = [];
    openedCards = [];
    // moves
    moves = 0;
    totalMoves = 0;
    movesContainer.innerHTML = 0;
    // ratings
    ratingsContainer.innerHTML = stars + stars + stars;
    totalRatingsContainer.innerHTML = totalStars + totalStars + totalStars;
    // timer
    stopTimer();
    isFirstClick = true;
    seconds = 0;
    totalSeconds = 0
    timerContainer.innerHTML = seconds + 's';
    totalTimeContainer.innerHTML = totalSeconds + 's';
}

// modal

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const restartButton = document.querySelector(".btn-restart");
const endButton = document.querySelector(".btn-end");

const totalRatingsContainer = document.querySelector(".total-stars");

const totalStars = `<i class="fa fa-star"></i>`;
totalRatingsContainer.innerHTML = totalStars + totalStars + totalStars;

const totalRating = () => {
    if (moves <= 10) {
        totalRatingsContainer.innerHTML = totalStars + totalStars + totalStars;
    } else if (moves <= 14) {
        totalRatingsContainer.innerHTML = totalStars + totalStars;
    } else {
        totalRatingsContainer.innerHTML = totalStars;
    }
}



const toggleModal = () => {
    modal.classList.toggle("show-modal");
}

function windowOnClick(evt) {
    if (evt.target === modal) {
        toggleModal();
    }
}

modal.addEventListener("click", toggleModal);

window.addEventListener("click", windowOnClick);

restartButton.addEventListener("click", function() {
    cardsParent.innerHTML = "";
    init();
    reset();
});

endButton.addEventListener("click", function() {
    isOver();
    toggleModal();
});

closeButton.addEventListener("click", function(){
    isOver();
    toggleModal();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


init();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */