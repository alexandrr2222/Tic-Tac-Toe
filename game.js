const gameBoard = (() => {
    let gameBoardPieces = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const claimPiece = (player, id) => {
        
        const drawPiece = document.querySelector(`#${id}`);
        if(player.mark = "X")drawPiece.textContent = "X";
        else if(player.mark = "O")drawPiece.textContent = "O";
        gameBoardPieces[id] = player.mark;

        // let tempPrompt = Number(prompt("write number from 0 to 8"));
        // while(gameBoardPieces[tempPrompt] !== " "){
        //     console.log("error, that piece is claimed")
        //     tempPrompt = Number(prompt("write number from 0 to 8"));
        // }
        // gameBoardPieces[tempPrompt] = player.mark;
        displayBoard();
    }
    const displayBoard = () => {
        // console.log("#################\n", gameBoardPieces.slice(0, 3).toString(), "\n", gameBoardPieces.slice(3, 6).toString(), "\n", gameBoardPieces.slice(6, 9).toString(), "\n #################")
    }
    const resetBoard = () => {
        gameBoardPieces.fill(" ");
    }
    const winCondition = (mark) => {
        const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = gameBoardPieces;
        if(
        //Rows
        ([p1, p2, p3].every(piece => piece === mark)) ||
        ([p4, p5, p6].every(piece => piece === mark)) ||
        ([p7, p8, p9].every(piece => piece === mark)) ||
        //Columns
        ([p1, p4, p7].every(piece => piece === mark)) ||
        ([p2, p5, p8].every(piece => piece === mark)) ||
        ([p3, p6, p9].every(piece => piece === mark)) ||
        //Diagonal
        ([p1, p5, p9].every(piece => piece === mark)) ||
         ([p3, p5, p7].every(piece => piece === mark))
        ){
            return true;
        }
        return false;
    }
    const fullBoardCheck = () => {
        if(gameBoardPieces.every(p => p !== " ")){
            return true;
        }
        return false;
    }
    return {claimPiece, resetBoard, winCondition, fullBoardCheck};
})()

const gameController = (() => {
    let player1 = null;
    let player2 = null;
    
    const setUp = () => {
        const player1Name = localStorage.getItem("player1Name");
        const player2Name = localStorage.getItem("player2Name");
        const player1Type = localStorage.getItem("player1Type");
        const player2Type = localStorage.getItem("player2Type");
        const player1Mark = localStorage.getItem("player1Mark");
        const player2Mark = localStorage.getItem("player2Mark");
        if(player1Mark === "X"){
            player1 = makePlayer(player1Name, player1Type, player1Mark);
            player2 = makePlayer(player2Name, player2Type, player2Mark);
        }
        else{
            player1 = makePlayer(player2Name, player2Type, player2Mark);
            player2 = makePlayer(player1Name, player1Type, player1Mark);
        }
        const insertPlayer1Name = document.querySelector(".playerName1");
        const insertPlayer2Name = document.querySelector(".playerName2");
        insertPlayer1Name.textContent = player1.name;
        insertPlayer2Name.textContent = player2.name;
    }

    const setListeners = () => {
        let toggle = false;
        pieces.forEach(pc => {
                pc.addEventListener("click", () => {
                    id = Number(pc.id);
                    toggle = !toggle
                    if(toggle){
                        gameBoard.claimPiece(player1, id)
                    }
                    else if(!toggle){
                        gameBoard.claimPiece(player2, id)
                    }
                });
        });
    }

    const initiate = () => {
    const currentPlayer = document.querySelector(".currentTurnPlayerNameInsert")
    const winNumber1 = document.querySelector(".winNumber1");
    const winNumber2 = document.querySelector(".winNumber2");
    const winText1 = document.querySelector(".winText1");
    const winText2 = document.querySelector(".winText2");
    const currentTurnX = document.querySelector(".currentTurnX");
    const currentTurnO = document.querySelector(".currentTurnO");
    const xShadow = document.querySelector(".xShadow");
    const oShadow = document.querySelector(".oShadow");
    currentPlayer.style.color = "#555E62"
    const pieces = document.querySelectorAll(".piece");
    for(let i = 0; i < 9; i++){
        currentPlayer.textContent = `${player1.name}'S TURN`;
        currentTurnX.classList.add("opacityUpX");
        currentTurnO.classList.remove("opacityUpO");
        xShadow.classList.remove("hider");
        oShadow.classList.add("hider");


        gameBoard.claimPiece(player1);
        if(gameBoard.winCondition(player1.mark)){
            // console.log(player1.name, " won");
            currentPlayer.style.color = "#00EEC5"
            currentPlayer.textContent = `${player1.name} CLAIMS VICTORY!`;
            player1.score += 1;
            if(player1.score === 1) winText1.textContent = "WIN"
            else winText1.textContent = "WINS"
            winNumber1.textContent = player1.score;
            // console.log(`Player 1 current score is: ${player1.score} \n Player 2 current score is: ${player2.score}`);
            gameBoard.resetBoard();
            break;
        }
        else if(gameBoard.fullBoardCheck()){
            currentPlayer.textContent = "DRAW";
            // console.log("tie");
            gameBoard.resetBoard();
            break;
        }
        currentPlayer.textContent = `${player2.name}'S TURN`;
        currentTurnX.classList.remove("opacityUpX");
        currentTurnO.classList.add("opacityUpO");
        xShadow.classList.add("hider");
        oShadow.classList.remove("hider");
        gameBoard.claimPiece(player2);
        if(gameBoard.winCondition(player2.mark)){
            // console.log("player2 won");
            currentPlayer.style.color = "#E6D172"
            currentPlayer.textContent = `${player1.name} CLAIMS VICTORY!`;
            player2.score += 1;
            if(player1.score === 1) winText2.textContent = "WIN"
            else winText2.textContent = "WINS"
            winNumber2.textContent = player1.score;
            // console.log(`Player 1 current score is: ${player1.score} \n Player 2 current score is: ${player2.score}`);
            gameBoard.resetBoard();
            break;
        }
        // else if(gameBoard.fullBoardCheck()){
        //     currentPlayer.textContent = "DRAW";
        //     console.log("tie");
        //     gameBoard.resetBoard();
        //     break;
        // }
    }
  }
  return {setUp, setListeners, initiate}
})()

function makePlayer(name, type, mark){
    return{
        name,
        type,
        mark,
        score: 0
    }
}

const DOMLogic = {

}

function nig(){

}
gameController.setUp()