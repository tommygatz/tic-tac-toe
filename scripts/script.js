
const newGameBtn = document.getElementById('new-game');
const playAgainBtn = document.getElementById('play-again');
const playerOneText = document.getElementById('player-one');
const playerTwoText = document.getElementById('player-two');

newGameBtn.addEventListener("click", newGame); 
playAgainBtn.addEventListener("click", playAgain);

var players = [];
var game = [];
var emptyBoard = 
    ["", "", "",
    "", "", "",
    "", "", ""];
var gameBoard = emptyBoard;

const newPlayer = (name, marker, tag) => {
    let pname = name;
    let pmarker = marker;
    let ptag = tag;
    let wins = 0;

    const getPlayerName = () => pname;
    const getWins = () => wins;
    const addWin = () => wins = wins + 1;
    const getMarker = () => pmarker;
    const getTag = () => ptag;

    return { addWin, getWins, getPlayerName, getMarker, getTag };
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

    let player1 = newPlayer(p1name, "X", "p1score");
    let player2 = newPlayer(p2name, "O", "p2score");
    players = [];
    players.push(player1, player2);

    playerOneText.innerHTML = `<h5>${players[0].getPlayerName()}</h5>`;
    playerTwoText.innerHTML = `<h5>${players[1].getPlayerName()}</h5>`;

    return { players };
};

function newGame() {
    resetGame();
    initBoardEvents();

    // const numPlayers = window.prompt("How many players?");
    // createPlayers(numPlayers);

    game = initGame();
    createPlayers(2);

    let pnametemp = players[+game.getTurn()].getPlayerName();
    let payload = `<h4>${pnametemp}'s turn.</h4>`;
    updateTextDisplay(payload);
    updateScores("0", "p1score");    
    updateScores("0", "p2score");

};




function initBoardEvents() {
    for(i=1; i<10; i++){
        document.getElementById(`cell${i}`).addEventListener("click", playTurn);
    }
};

function clearBoardEvents() {
    for(i=1; i<10; i++){
        document.getElementById(`cell${i}`).removeEventListener("click", playTurn);
    }
};

function resetGame() {
    let i = 0;
    gameBoard.forEach(element => {
        gameBoard[i] = "";
        i++;
    }); 
    updateGameBoard();
    playAgainBtn.style.display = "none";
};

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
};

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

        if(gameOverCheck()) {
            let payload = `<h4>${currentPlayer} wins!</h4>`;
            updateTextDisplay(payload);
            clearBoardEvents();
            players[+game.getTurn()].addWin();
            let newScore = players[+game.getTurn()].getWins();
            let playerTag = players[+game.getTurn()].getTag();
            updateScores(newScore, playerTag);
            playAgainBtn.style.display = "flex";
        } else if(tieCheck()) {
            let payload = `<h4>Tie game. Click Play Again!</h4>`;
            updateTextDisplay(payload);
            clearBoardEvents();
        } else {
            game.toggleTurn();
            let pnametemp = players[+game.getTurn()].getPlayerName();
            let payload = `<h4>${pnametemp}'s turn.</h4>`;
            updateTextDisplay(payload);
        }

    } else {
        let payload = "<h4>You can't play that square!</h4>";
        updateTextDisplay(payload);
    }

    updateGameBoard();
};

function gameOverCheck() {
    let result = false;
    let decision = false;
    let i = 0;
    let winConditions = [
        [gameBoard[0], gameBoard[1], gameBoard[2]],
        [gameBoard[3], gameBoard[4], gameBoard[5]],
        [gameBoard[6], gameBoard[7], gameBoard[8]],
        [gameBoard[0], gameBoard[4], gameBoard[8]],
        [gameBoard[2], gameBoard[4], gameBoard[6]],
        [gameBoard[0], gameBoard[3], gameBoard[6]],
        [gameBoard[1], gameBoard[4], gameBoard[7]],
        [gameBoard[2], gameBoard[5], gameBoard[8]]
    ];
    
    function test(condition) {
        let arr = condition;

        function compareX(item) {
            if (item == "X") {
                return true;
            } else {
                return false;
            };
        };
        function compareO(item) {
            if (item == "O") {
                return true;
            } else {
                return false;
            };
        };

        if (arr.every(compareX)) {
            result = true;
        } else if (arr.every(compareO)) {
            result = true;
        } else {
        };
        return result;
    };

    while (!decision && i < 8){
        decision = test(winConditions[i]);
        i++;
    };

    return decision;
};

function tieCheck() {
    let result = true;
    for (let index = 0; index < gameBoard.length; index++) {
        if (gameBoard[index] == "") {
            result = false;
            break;
        }
    }
    return result;
}

function legalPlayCheck(index) {
    if(gameBoard[index] == ""){
        return true;
    } else {
        return false;
    };
};

function updateScores(newScore, playerTag) {
    let scoreContent = document.getElementById(playerTag);
    let score = newScore;
    scoreContent.innerHTML = `<h5>${score}</h5>`;

};

function playAgain(){
    resetGame();
    updateGameBoard(gameBoard);
    initBoardEvents();
    let pnametemp = players[0].getPlayerName();
    let payload = `<h4>${pnametemp}'s turn.</h4>`;
    updateTextDisplay(payload);
};

