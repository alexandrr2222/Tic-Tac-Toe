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
        gameController.endCondition()
    }
    const displayBoard = () => {
        console.log(gameBoardPieces.slice(0, 3).toString(), gameBoardPieces.slice(3, 6).toString(), gameBoardPieces.slice(6, 9).toString(), "#################")
    }
    return {gameBoardPieces, claimPiece, displayBoard};
})()

const gameController = (() => {
  let breaker = false;
  const player1 = makePlayer("player1", "X");
  const player2 = makePlayer("player2", "O");
  const initiate = () => {
    for(let i = 0; i < 9; i++){
      if(breaker)break;
      gameBoard.claimPiece(player1);
      if(breaker)break;
      gameBoard.claimPiece(player2);
    }
  }
  const endCondition = () => {
    const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = gameBoard.gameBoardPieces;
      if(
        //Rows
        ([p1, p2, p3].every(piece => piece === "X")) ||
        ([p4, p5, p6].every(piece => piece === "X")) ||
        ([p7, p8, p9].every(piece => piece === "X")) ||
        //Columns
        ([p1, p4, p7].every(piece => piece === "X")) ||
        ([p2, p5, p8].every(piece => piece === "X")) ||
        ([p3, p6, p9].every(piece => piece === "X")) ||
        //Diagonal
        ([p1, p5, p9].every(piece => piece === "X")) ||
         ([p3, p5, p7].every(piece => piece === "X"))
        ){
        console.log("X win");
        player1.score += 1;
        breaker = true;
        gameBoard.gameBoardPieces.fill(" ");
        }
      else if(
        //Rows
        ([p1, p2, p3].every(piece => piece === "O")) ||
        ([p4, p5, p6].every(piece => piece === "O")) ||
        ([p7, p8, p9].every(piece => piece === "O")) ||
        //Columns
        ([p1, p4, p7].every(piece => piece === "O")) ||
        ([p2, p5, p8].every(piece => piece === "O")) ||
        ([p3, p6, p9].every(piece => piece === "O")) ||
        //Diagonal
        ([p1, p5, p9].every(piece => piece === "O")) ||
         ([p3, p5, p7].every(piece => piece === "O"))
        ){
        console.log("O win");
        breaker = true;
        player2.score += 1;
        gameBoard.gameBoardPieces.fill(" ");
        }
      else if(gameBoard.gameBoardPieces.every(p => p !== " ")){
            console.log("tie");
            breaker = true
            gameBoard.gameBoardPieces.fill(" ");
      }
    }
  return {initiate, endCondition}
})()

function makePlayer(name, mark){
    return{
        name,
        mark,
        score: 0
    }
}
gameController.initiate();