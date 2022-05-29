
// document.getElementById('reset-game').addEventListener("click", resetGame);
const newGameBtn = document.getElementById('new-game');
const playerOneText = document.getElementById('player-one');
const playerTwoText = document.getElementById('player-two');

newGameBtn.addEventListener("click", newGame); 

var gameBoard = 
["", "", "",
"", "", "",
"", "", ""];
var players = [];
var game = [];

const newPlayer = (name, marker) => {
    let pname = name;
    let pmarker = marker;
    let wins = 0;

    const getPlayerName = () => pname;
    const getWins = () => wins;
    const addWin = () => wins = wins + 1;
    const getMarker = () => pmarker;

    return { addWin, getWins, getPlayerName, getMarker };
};

const initGame = () => {
    let turn = false;
    let gamesPlayed = 0;

    const getTurn = () => turn;
    const toggleTurn = () => turn = !turn;
    const getGamesPlayed = () => gamesPlayed;
    const addGame = () => gamesPlayed = gamesPlayed + 1;

    return { getTurn, toggleTurn, getGamesPlayed, addGame };
};

const createPlayers = (numPlayers) => {
    let p1name = window.prompt("Enter the name of Player 1 (X)");
    let p2name = "";
    if (numPlayers == 2) {
        p2name = window.prompt("Enter the name of Player 2 (O)");
    } else {
        p2name = "Computer";
    }

    let player1 = newPlayer(p1name, "X");
    let player2 = newPlayer(p2name, "O");
    players = [];
    players.push(player1, player2);

    playerOneText.innerHTML = `<h4>${players[0].getPlayerName()}</h4>`;
    playerTwoText.innerHTML = `<h4>${players[1].getPlayerName()}</h4>`;

    return { players };
}

function newGame() {

    initBoardEvents();

    const numPlayers = window.prompt("How many players?");
    game = initGame();
    createPlayers(numPlayers);

    // return { players };
}




function initBoardEvents() {
    for(i=1; i<10; i++){
        document.getElementById(`cell${i}`).addEventListener("click", playTurn);
    }
}

function clearBoardEvents() {
    for(i=1; i<10; i++){
        document.getElementById(`cell${i}`).addEventListener("click", playTurn);
    }
    document.getElementById('reset-game').addEventListener("click", resetGame);
}

function resetGame() {
    console.log("reset game pressed");
    let i = 0;
    gameBoard.forEach(element => {
        gameBoard[i] = "";
        i++;
    }); 
    updateGameBoard();
}

function createGameBoard() {
    // create new array with empty gameBoard template
}

function updateGameBoard() {
    // take current player's marker and add it to the gameboard array
    // check for game over
    // toggle player turn
    let i = 0;
    gameBoard.forEach(element => {
        index = i + 1;
        const cell = document.getElementById(`cell${index}`);
        cell.innerHTML = element;
        i++;
    }); 
};

function playTurn() {
    let marker = "";
    let cell = this.id;
    let element = document.getElementById(cell);
    let index = cell.slice(-1) - 1;


    if(game.getTurn()) {
        marker = "O";
    } else { 
        marker = "X";
    };
    
    if(legalPlayCheck(index)) {
        element.innerHTML = marker;
        gameBoard[index] = marker;  
        game.toggleTurn();
    } else {
        alert("You can't play that square!");
    }

    gameOverCheck();

    console.log(game.getTurn());
    console.log(gameBoard);
}

function gameOverCheck() {
    // check if a winning scenario exists in gameboard array
}

function legalPlayCheck(index) {
    if(gameBoard[index] == ""){
        return true;
    } else {
        return false;
    }
}



window.onload = updateGameBoard();
