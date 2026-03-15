const gameBoard = (() => {
    let gameBoardPieces = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const claimPiece = (player, id) => {
        const drawPiece = document.querySelector(`#P${id}`);
        if(player.mark === "X") drawPiece.textContent = "X";
        else if(player.mark === "O") drawPiece.textContent = "O";
        gameBoardPieces[id - 1] = player.mark;
    }
    const checkClaim = (id) => {
        if(gameBoardPieces[id - 1] !== " ") return true;
        else return false
    }
    const resetBoard = () => {
        const pieces = document.querySelectorAll(".piece")
        pieces.forEach(pc => {
            pc.classList.remove("blueClaim");
            pc.classList.remove("yellowClaim");
            pc.textContent = " "
        });
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
    return {claimPiece, resetBoard, winCondition, fullBoardCheck, checkClaim};
})()

const gameController = (() => {
    let player1 = null;
    let player2 = null;
    let toggle = false;


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
        const currentPlayer = document.querySelector(".currentTurnPlayerNameInsert");
        const winNumber1 = document.querySelector(".winNumber1");
        const winNumber2 = document.querySelector(".winNumber2");
        const winText1 = document.querySelector(".winText1");
        const winText2 = document.querySelector(".winText2");
        const pieces = document.querySelectorAll(".piece");
        const newGame = document.querySelector(".newGame");
        const rematch = document.querySelector(".rematch");
        const quit = document.querySelector(".quit");
        const afterVictory = document.querySelector(".afterVictory")
        const body = document.querySelector("body");
        newGame.addEventListener("click", () => {
            if(toggle){
                statContCurrent();
            }
            currentPlayer.style.color = "#555E62"
            currentPlayer.style.textShadow = "none"
            afterVictory.textContent = " ";
            currentPlayer.textContent = `${player1.name}'S TURN`;
            toggle = false;
            gameBoard.resetBoard();
        })
        rematch.addEventListener("click", () => {
            if(toggle){
                statContCurrent();
            }
            currentPlayer.style.color = "#555E62"
            afterVictory.textContent = " ";
            currentPlayer.style.textShadow = "none"
            currentPlayer.textContent = `${player1.name}'S TURN`;
            player1.score = 0;
            player2.score = 0;
            winText1.textContent = "WINS"
            winNumber1.textContent = player1.score;
            winText2.textContent = "WINS"
            winNumber2.textContent = player2.score;
            toggle = false;
            gameBoard.resetBoard();
        });
        quit.addEventListener("click", () => {
            document.body.style.opacity = "0"
            setTimeout(() => {
               localStorage.clear()
                window.location.href = "index.html"; 
            }, 1000);
        });
        pieces.forEach(pc => {
            pc.addEventListener("mouseenter", () => {
                id = Number(pc.id.match(/\d+/)[0]);
                if(gameBoard.checkClaim(id)){
                    return;
                }
                if(!toggle){
                    pc.textContent = "X";
                    pc.classList.add("blue");
                }
                else if(toggle){
                    pc.textContent = "O";
                    pc.classList.add("yellow");
                }
            });
        });
        pieces.forEach(pc => {
            pc.addEventListener("mouseleave", () => {
                id = Number(pc.id.match(/\d+/)[0]);
                if(gameBoard.checkClaim(id)){
                    return;
                }
                if(!toggle){
                    pc.classList.add("fade");
                    setTimeout(() => {
                        pc.classList.remove("blue", "fade");
                        pc.textContent = " ";
                    }, 200)
                }
                else if(toggle){
                    pc.classList.add("fade");
                    setTimeout(() => {
                        pc.classList.remove("yellow", "fade");
                        pc.textContent = " ";
                    }, 200)
                }
            });
        });
        pieces.forEach(pc => {
                pc.addEventListener("click", () => {
                    id = Number(pc.id.match(/\d+/)[0]);
                    if(gameBoard.checkClaim(id)){
                        return;
                    }
                    toggle = !toggle
                    statContCurrent();
                    currentPlayer.style.color = "#555E62"
                    currentPlayer.style.textShadow = "none"
                    afterVictory.textContent = " ";
                    if(toggle){
                        pc.classList.remove("blue");
                        pc.classList.add("blueClaim");
                        currentPlayer.textContent = `${player2.name}'S TURN`;
                        currentPlayer.style.transition = "none"
                        gameBoard.claimPiece(player1, id)
                        if(gameBoard.winCondition(player1.mark)){
                            toggle = !toggle
                            statContCurrent();
                            currentPlayer.style.color = "#00EEC5"
                            currentPlayer.style.textShadow = "0 0 25px #00EEC5"
                            currentPlayer.textContent = `${player1.name} CLAIMS VICTORY!`;
                            currentPlayer.style.transition = "0.3s ease"
                            afterVictory.textContent = `${player1.name}'S TURN`;
                            player1.score += 1;
                            if(player1.score === 1) winText1.textContent = "WIN"
                            else winText1.textContent = "WINS"
                            winNumber1.textContent = player1.score;
                            gameBoard.resetBoard();
                        }
                        else if(gameBoard.fullBoardCheck()){
                            toggle = !toggle
                            statContCurrent();
                            currentPlayer.textContent = "DRAW";
                            afterVictory.textContent = `${player1.name}'S TURN`;
                            gameBoard.resetBoard();
                        }
                    }
                    else if(!toggle){
                        pc.classList.remove("yellow");
                        pc.classList.add("yellowClaim");
                        currentPlayer.textContent = `${player1.name}'S TURN`;
                        currentPlayer.style.transition = "none"
                        gameBoard.claimPiece(player2, id)
                        if(gameBoard.winCondition(player2.mark)){
                            currentPlayer.style.color = "#E6D172"
                            currentPlayer.style.textShadow = "0 0 25px #E6D172"
                            currentPlayer.textContent = `${player2.name} CLAIMS VICTORY!`;
                            currentPlayer.style.transition = "0.3s ease"
                            afterVictory.textContent = `${player1.name}'S TURN`;
                            player2.score += 1;
                            if(player2.score === 1) winText2.textContent = "WIN"
                            else winText2.textContent = "WINS"
                            winNumber2.textContent = player2.score;
                            gameBoard.resetBoard();
                        }
                    }
                });
        });
    }
    const statContCurrent = () => {
        const currentTurnX = document.querySelector(".currentTurnX");
        const currentTurnO = document.querySelector(".currentTurnO");
        // const xShadow = document.querySelector(".xShadow");
        // const oShadow = document.querySelector(".oShadow");
        currentTurnX.classList.toggle("opacityUpX");
        currentTurnO.classList.toggle("opacityUpO");
        // xShadow.classList.toggle("hider");
        // oShadow.classList.toggle("hider");
    }

  return {setUp, setListeners}
})()

function makePlayer(name, type, mark){
    return{
        name,
        type,
        mark,
        score: 0
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.offsetHeight;
    document.body.style.opacity = "1";
})
gameController.setUp()
gameController.setListeners()