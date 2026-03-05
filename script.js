const gameBoard = (() => {
    let gameBoardPieces = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const claimPiece = (player) => {
        let tempPrompt = Number(prompt("write number from 0 to 8"));
        while(gameBoardPieces[tempPrompt] !== " "){
            console.log("error, that piece is claimed")
            tempPrompt = Number(prompt("write number from 0 to 8"));
        }
        gameBoardPieces[tempPrompt] = player.mark;
        displayBoard();
    }
    const displayBoard = () => {
        console.log("#################\n", gameBoardPieces.slice(0, 3).toString(), "\n", gameBoardPieces.slice(3, 6).toString(), "\n", gameBoardPieces.slice(6, 9).toString(), "\n #################")
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
  const player1 = makePlayer("player1", "X");
  const player2 = makePlayer("player2", "O");
  const initiate = () => {
    for(let i = 0; i < 9; i++){
        gameBoard.claimPiece(player1);
        if(gameBoard.winCondition(player1.mark)){
            console.log("playa1 won")
            gameBoard.resetBoard();
            break;
        }
        else if(gameBoard.fullBoardCheck()){
            console.log("tie");
            gameBoard.resetBoard();
            break;
        }
        gameBoard.claimPiece(player2);
        if(gameBoard.winCondition(player2.mark)){
            console.log("playa2 won")
            gameBoard.resetBoard();
            break;
        }
        else if(gameBoard.fullBoardCheck()){
            console.log("tie");
            gameBoard.resetBoard();
            break;
        }
    }
  }
  return {initiate}
})()

function makePlayer(name, mark){
    return{
        name,
        mark,
        score: 0
    }
}
gameController.initiate();