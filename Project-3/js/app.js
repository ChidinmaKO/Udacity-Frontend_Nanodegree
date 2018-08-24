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
        // console.log(card.innerHTML);

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
            // console.log(openedCards);

            // we need to compare the cards
            compareCards(currentCard, previousCard);

       } else {
           // here we don't have an already clicked card
            currentCard.classList.add("open", "show", "disabled");
            openedCards.push(this);
            // console.log(openedCards);
       }
    });
}

/*
* compare the two cards to see if they match or not
* add new moves if they do not match
*/

const compareCards = (currentCard, previousCard) => {

    if(currentCard.innerHTML === previousCard.innerHTML) {
        // console.log("matches");
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);
        console.log(matchedCards);

        openedCards = [];

        //check if cards are matched

        isOver();

    }else {

        // before the wrong matched card is removed, we need to see it for 
        // 2 seconds... hence the setTimeout function
        setTimeout(function() {
            console.log("!matches");
            previousCard.classList.remove("open", "show", "disabled");
            currentCard.classList.remove("open", "show", "disabled");
            // previousCard.classList.add("unmatch");
            // currentCard.classList.add("unmatch");
            openedCards = [];
        }, 200);
    }

    //add new move
    addMove();
    console.log(moves);
}

/*
* Check if the game is over
*/
const isOver = () => {
    if (matchedCards.length === cardsArray.length) {
        // console.log("game over, beautiful");
        stopTimer();
        setTimeout(() => {
            alert("game over, beautiful");
        }, 500);
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
 * Moves
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
//movesContainer.innerHTML = 0; <= not needed because there's already a 
// span class in the HTML with "0"
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    //call the rating function
    rating();
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

// const timerContainer = document.querySelector(".timer");
// const timer = () => {
//     let minutes = 0;
//     let seconds = 0;
//     gameInterval = setInterval(function () {
//         seconds = parseInt(seconds, 10) + 1;
//         minutes = parseInt(minutes, 10);
//         if (seconds >= 60) {
//             minutes += 1;
//             seconds = 0;
//         }

//         seconds = seconds < 10 ? "0" + seconds : seconds;
//         minutes = minutes < 10 ? "0" + minutes : minutes;

//         timerContainer.innerHTML = minutes + ":" + seconds;
//         lastTime.textContent = time.textContent;
//         console.log(time,"hellooooo are you there????");
//     }, 1000);
// }

const timerContainer = document.querySelector(".timer");
let gameTimer, totalSeconds = 0;

timerContainer.innerHTML = totalSeconds + 's';

const startTimer = () => {
    gameTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);

}

const stopTimer = () => {
    clearInterval(gameTimer);
}

const reset = () => {
    // matched cards
    matchedCards = [];
    // moves
    moves = 0;
    movesContainer.innerHTML = 0;
    // ratings
    ratingsContainer.innerHTML = stars + stars + stars;
    // timer
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + 's';
}

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