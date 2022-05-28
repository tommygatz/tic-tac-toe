function initializeEvents() {
    document.getElementById("cell1").addEventListener("click", playTurn);
    document.getElementById("cell2").addEventListener("click", playTurn);
    document.getElementById("cell3").addEventListener("click", playTurn);
    document.getElementById("cell4").addEventListener("click", playTurn);
    document.getElementById("cell5").addEventListener("click", playTurn);
    document.getElementById("cell6").addEventListener("click", playTurn);
    document.getElementById("cell7").addEventListener("click", playTurn);
    document.getElementById("cell8").addEventListener("click", playTurn);
    document.getElementById("cell9").addEventListener("click", playTurn);

}


function newGame() {
    // New game logic
}

function createPlayer () {
    // create a new player object using Player template
    // player object should have its own functions to return 
}

function createGameBoard() {
    // create new array with empty gameBoard template
}

function updateGameBoard() {
    // take current player's marker and add it to the gameboard array
    // check for game over
    // toggle player turn
    let i = 0;
    myTempArray.forEach(element => {
        index = i + 1;
        const cell = document.getElementById(`cell${index}`);
        cell.innerHTML = element;
        i++;
    }); 
}

function playTurn() {
    let cell = this.id;
    index = cell.slice(-1) - 1;
    let element = document.getElementById(cell);
    element.innerHTML = index;
}

function gameOverCheck() {
    // check if a winning scenario exists in gameboard array
}

var myTempArray = 
        ["", "", "",
        "", "", "",
        "", "", ""];

window.onload = updateGameBoard(), initializeEvents();