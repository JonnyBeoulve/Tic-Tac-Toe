// This self executing function literal contains all the programming required for the Tic Tac Toe game
( function(){

/* ===== GLOBAL VARIABLES ===== */
const boardDiv = document.getElementById('board'); // The Game Board screen
const startDiv = document.createElement('div'); // The Start Menu screen
const finishDiv = document.createElement('div'); // The Finish Menu screen
const gameBoard = document.querySelectorAll('.box'); // All spaces comprising the Game Board
let playerTurn = 2; // Determines which Player's turn it is (1 = O; 2 = X)
let player1 = document.getElementById('player1'); // Player 1's element (O)
let player2 = document.getElementById('player2'); // Player 2's element (X)

/* ===== INITIAL PROGRAM SETUP ===== */
// Add style elements and button to Start and Finish Menu in addition to preparing game
boardDiv.style.display = 'none'; // Hide Game Board on load
startDiv.innerHTML = '<div class="screen screen-start" id="start"> <header><h1>Tic Tac Toe</h1> <a href="#" class="button" id="startButton">Start Game</a></header></div>'; // JavaScript invoked Start Menu HTML
finishDiv.innerHTML = '<div class="screen screen-win" id="finish"> <header><h1>Tic Tac Toe</h1> <p id="message"></p><a href="#" class="button" id="finishButton">New Game</a></header></div>'; // JavaScript invoked Finish Menu HTML
document.body.appendChild(startDiv); // Append the Start Menu HTML
document.body.appendChild(finishDiv); // Append the Finish Menu HTML
finishDiv.style.display = 'none'; // Hide Finish Menu (for now)
const finishScreenDiv = document.getElementById('finish'); // Obtain Finish's div element to be controlled during game end and reset
player2.className += ' active'; // Default to a Player 2 highlight (X goes first)

/* ===== FUNCTIONS ===== */
// Check horizontal, vertical, and diagonal planes of Game Board to see if there's a winner
function checkWin(i) {
    if((gameBoard[0].className.includes('filled-'+i)) && (gameBoard[1].className.includes('filled-'+i)) && (gameBoard[2].className.includes('filled-'+i)))
    {
        return true;
    }
    else if((gameBoard[3].className.includes('filled-'+i)) && (gameBoard[4].className.includes('filled-'+i)) && (gameBoard[5].className.includes('filled-'+i)))
    {
        return true;
    }
    else if((gameBoard[6].className.includes('filled-'+i)) && (gameBoard[7].className.includes('filled-'+i)) && (gameBoard[8].className.includes('filled-'+i)))
    {
        return true;
    }
    else if((gameBoard[0].className.includes('filled-'+i)) && (gameBoard[4].className.includes('filled-'+i)) && (gameBoard[8].className.includes('filled-'+i)))
    {
        return true;
    }
    else if((gameBoard[2].className.includes('filled-'+i)) && (gameBoard[4].className.includes('filled-'+i)) && (gameBoard[6].className.includes('filled-'+i)))
    {
        return true;
    }
    else if((gameBoard[0].className.includes('filled-'+i)) && (gameBoard[3].className.includes('filled-'+i)) && (gameBoard[6].className.includes('filled-'+i)))
    {
        return true;
    }
    else if((gameBoard[1].className.includes('filled-'+i)) && (gameBoard[4].className.includes('filled-'+i)) && (gameBoard[7].className.includes('filled-'+i)))
    {
        return true;
    }
    else if((gameBoard[2].className.includes('filled-'+i)) && (gameBoard[5].className.includes('filled-'+i)) && (gameBoard[8].className.includes('filled-'+i)))
    {
        return true;
    }
    else {
        return false;
    }
}

// Check if there is no winner after Game Board is filled
function checkDraw() {
    let boardFilledCounter = 0; // If counter reaches 9 game was a draw, return True

    // Check all Game Board spaces to see if filled
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i].className.includes('filled-')) {
            boardFilledCounter++;
        } 
    }
        
    // Check if the nine filled spaces were found
    if (boardFilledCounter === 9)  {
        return true;
    }
    
    return false;
}

// If there's a winner or draw, show the Finish Menu, corresponding information, and a button for returning to Start Menu
function declareWinner(i) {
    if(i === 1) {
        boardDiv.style.display = 'none';
        finishDiv.style.display = '';
        finishScreenDiv.className += ' screen-win-one';
        document.getElementById('message').innerHTML = 'Winner';
    } else if (i === 2) {
        boardDiv.style.display = 'none';
        finishDiv.style.display = '';
        finishScreenDiv.className += ' screen-win-two';
        document.getElementById('message').innerHTML = 'Winner';
    } else if (i === 0) {
        boardDiv.style.display = 'none';
        finishDiv.style.display = '';
        finishScreenDiv.className += ' screen-win-tie';
        document.getElementById('message').innerHTML = 'Draw';
    }
}

/* ===== EVENT LISTENERS ===== */
// Create event listener for the Start Button on the Start Menu
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    startDiv.style.display = 'none';
    boardDiv.style.display = '';
});

// Create event listener for the New Game button on the Finish Menu to reset the game and divs
const finishButton = document.getElementById('finishButton');
finishButton.addEventListener('click', () => {
    finishDiv.style.display = 'none';
    startDiv.style.display = '';
    player2.className += ' active';
    player1.classList.remove('active');
    finishScreenDiv.classList.remove('screen-win-one')
    finishScreenDiv.classList.remove('screen-win-two')
    finishScreenDiv.classList.remove('screen-win-tie')
    playerTurn = 2;
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i].classList.remove('box-filled-1');
        gameBoard[i].classList.remove('box-filled-2');
    }
    document.getElementById('message').innerHTML = '';
});

// Create event listener for box selections of Game Board, including mouseover and mouseout
gameBoard.forEach(function(element) {
    element.addEventListener('click', (e) => {
        
        //First check if space is taken
        if (element.className.includes('filled-')){
            alert('That space is already taken!');
            return 0;
        }

        // Add X or O depending on whether Player 1 or Player 2 had turn
        if (playerTurn === 1) {
            element.className += ' box-filled-1';
            player1.classList.remove('active');
            player2.className += ' active';
            if(checkWin(playerTurn)) {
                declareWinner(playerTurn);
            } else if(checkDraw()) {
                declareWinner(0);
            }
            playerTurn += 1;
        } else if (playerTurn === 2) {
            element.className += ' box-filled-2';
            player2.classList.remove('active');
            player1.className += ' active';
            if(checkWin(playerTurn)) {
                declareWinner(playerTurn);
            } else if(checkDraw()) {
                declareWinner(0);
            }
            playerTurn -= 1;
        }
    })

    // Show Players preview of their X or O
    element.addEventListener('mouseover', (e) => {
        if (playerTurn === 1) {
            element.style.backgroundImage = "url('img/o.svg')";
        } else if (playerTurn === 2) {
            element.style.backgroundImage = "url('img/x.svg')";
        }
    })

    // Remove X or O preview when mouse leaves Game Board box
    element.addEventListener('mouseout', (e) => {
        if (playerTurn === 1) {
            element.style.backgroundImage = "";
        } else if (playerTurn === 2) {
            element.style.backgroundImage = "";
        }
    })
});
}());