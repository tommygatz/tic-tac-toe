
const newGameBtn = document.getElementById('new-game');
const playerOneText = document.getElementById('player-one');
const playerTwoText = document.getElementById('player-two');

newGameBtn.addEventListener("click", newGame); 

var players = [];
var game = [];
var gameBoard = 
    ["", "", "",
    "", "", "",
    "", "", ""];

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

    playerOneText.innerHTML = `<h5>${players[0].getPlayerName()}</h5>`;
    playerTwoText.innerHTML = `<h5>${players[1].getPlayerName()}</h5>`;

    return { players };
}

function newGame() {
    resetGame();
    initBoardEvents();

    const numPlayers = window.prompt("How many players?");
    game = initGame();
    createPlayers(numPlayers);

    let pnametemp = players[+game.getTurn()].getPlayerName();
    let payload = `<h4>${pnametemp}'s turn.</h4>`;
    updateTextDisplay(payload)
}




function initBoardEvents() {
    for(i=1; i<10; i++){
        document.getElementById(`cell${i}`).addEventListener("click", playTurn);
    }
}

function clearBoardEvents() {
    for(i=1; i<10; i++){
        document.getElementById(`cell${i}`).removeEventListener("click", playTurn);
    }
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

function updateGameBoard() {
    let i = 0;
    gameBoard.forEach(element => {
        index = i + 1;
        const cell = document.getElementById(`cell${index}`);
        cell.innerHTML = element;
        i++;
    }); 
};

function updateTextDisplay(payload) {
    let textContent = document.getElementById('game-header');
    textContent.innerHTML = payload;
}

function playTurn() {
    let marker = "";
    let cell = this.id;
    let index = cell.slice(-1) - 1;
    let element = document.getElementById(cell);
    let currentPlayer = players[+game.getTurn()].getPlayerName();

    if(game.getTurn()) {
        marker = "O";
    } else { 
        marker = "X";
    };
    
    if(legalPlayCheck(index)) {
        element.innerHTML = marker;
        gameBoard[index] = marker;  
        game.toggleTurn();
        let pnametemp = players[+game.getTurn()].getPlayerName();
        let payload = `<h4>${pnametemp}'s turn.</h4>`;
        updateTextDisplay(payload)
    } else {
        let payload = "<h4>You can't play that square!</h4>";
        updateTextDisplay(payload);
    }



    if(gameOverCheck()) {
        let payload = `<h4>${currentPlayer} wins!</h4>`;
        updateTextDisplay(payload);
        clearBoardEvents();
        
    };





    updateGameBoard();
}

function gameOverCheck() {
    let result = false;

    if ((gameBoard[0] == gameBoard[1]) && (gameBoard[1] == gameBoard[2]) && gameBoard[0] != "") {
        console.log('GAME OVER');
        result = true;
    } else {
        console.log('Game not over yet');
    }







    return result;
}

function legalPlayCheck(index) {
    if(gameBoard[index] == ""){
        return true;
    } else {
        return false;
    }
}



// window.onload = updateGameBoard();
