const gameBoard = (() => {
    let gameBoardPieces = ["", "", "", "", "", "", "", "", ""];
    const claimPiece = (player) => {
        let tempPrompt = Number(prompt("write number from 0 to 8"));
        if(gameBoardPieces[tempPrompt] !== ""){
            console.log("error, that piece is claimed")
            tempPrompt = Number(prompt("write number from 0 to 8"));
        }
        else gameBoardPieces[tempPrompt] = player.mark;
    }
    const displayBoard = () => {
        console.log(gameBoardPieces.slice(0, 3))
        console.log(gameBoardPieces.slice(3, 6))
        console.log(gameBoardPieces.slice(6, 9))
        console.log("#################")
    }
    return {gameBoardPieces, claimPiece, displayBoard};
})()

const gameController = (() => {
    const toggle = () => {
        let turnToggle = true;
        if(turnToggle){
            turnToggle = false;
        }
        else{
            turnToggle = true;
        }
    }
    const endCondition = () => {
        if(
            (gameBoard.gameBoardPieces[0] === "X") && (gameBoard.gameBoardPieces[1] === "X") && (gameBoard.gameBoardPieces[2] === "X")
        ){
            console.log("win");
            gameBoard.gameBoardPieces.fill("");
        }
        else if(gameBoard.gameBoardPieces.every(p => p !== "")){
            console.log("tie");
            gameBoard.gameBoardPieces.fill("");
        }
        else console.log("nothing yet")
    }
    return {toggle, endCondition}
})()

function makePlayer(name, mark){
    return{
        name,
        mark
    }
}
const john = makePlayer("player1", "X");
const peter = makePlayer("player2", "O")

gameBoard.claimPiece(john);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(peter);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(john);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(peter);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(john);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(peter);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(john);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(peter);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(john);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(peter);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(john);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(peter);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(john);
gameBoard.displayBoard()
gameController.endCondition()
gameBoard.claimPiece(peter);
gameBoard.displayBoard()
gameController.endCondition()