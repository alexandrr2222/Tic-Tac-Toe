const gameBoard = (() => {
    let gameBoardPieces = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const claimPiece = (player, id) => {
        const drawPiece = document.querySelector(`#P${id}`);
        if(player.mark === "X") drawPiece.textContent = "X";
        else if(player.mark === "O") drawPiece.textContent = "O";
        gameBoardPieces[id - 1] = player.mark;
    }
    const claimPieceRobot = (player, diff) => {
        for(const[index, item] of gameBoardPieces.entries()){
            console.log(Math.floor(Math.random() * (8 - 0 + 1)) + 0)
            // console.log(index, item)
            if(item === " "){
                
            }
        }
    }
    const checkClaim = (id) => {
        if(gameBoardPieces[id - 1] !== " ") return true;
        else return false
    }
    const resetBoard = (player1, buttonBoolean, br) => {
        const currentPlayer = document.querySelector(".currentTurnPlayerNameInsert");
        const afterVictory = document.querySelector(".afterVictory");
        const pieces = document.querySelectorAll(".piece");
        const canvas = document.querySelector(".winCanvas");
        const ctx = canvas.getContext("2d");
        let OUTER_TIME = 1350;
        let INNER_TIME = 650;
        if(buttonBoolean){
            OUTER_TIME = 200;
            INNER_TIME = 200;
        }
        else{
            OUTER_TIME = 1350;
            INNER_TIME = 650;
        }
        pieces.forEach(pc => {
            setTimeout(() => {
                pc.classList.remove("blueClaim");
                pc.classList.remove("yellowClaim");
                pc.classList.add("fadeReset");
                if(br !== "y"){currentPlayer.classList.add("fadeReset")
                }
                currentPlayer.style.color = "#555E62";
                currentPlayer.style.textShadow = "none";
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                setTimeout(() => {
                    pc.classList.remove("fadeReset");
                    currentPlayer.classList.remove("fadeReset")
                    pc.textContent = " ";
                    afterVictory.textContent = " ";
                    currentPlayer.textContent = `${player1.name}'S TURN`;
                    
                    gameBoardPieces.fill(" ");
                }, INNER_TIME);
            }, OUTER_TIME);
            
        });
    }
    const winCondition = (mark) => {
        const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = gameBoardPieces;
        const board = document.querySelector(".board");
        const canvas = document.querySelector(".winCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = board.offsetWidth
        canvas.height = board.offsetHeight
        const CWidth = canvas.width;
        const CHeight = canvas.height;
        let hor1 = CWidth / 6;
        let hor2 = CWidth / 2;
        let hor3 = CWidth * (5 / 6);
        let ver1 = CHeight / 6;
        let ver2 = CHeight / 2;
        let ver3 = CHeight * (5 / 6);
        function drawLine(h1, h2, v1, v2){
            ctx.beginPath();
            ctx.moveTo(h1, v1);
            ctx.lineTo(h2, v2);

            ctx.stroke()
            if(mark === "X"){
                ctx.strokeStyle = "#00EEC5";
                ctx.shadowColor = "#00EEC5";
            }
            if(mark === "O"){
                ctx.strokeStyle = "#E6D172";
                ctx.shadowColor = "#E6D172";
            }
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.shadowBlur = 30;
            ctx.stroke();
            ctx.closePath();
        }
        if(
        //Rows
        [p1, p2, p3].every(piece => piece === mark)){
            drawLine(hor1 - CWidth * (1 / 11), hor3 + CWidth * (1 / 11), ver1, ver1);
            return true;
        }
        else if([p4, p5, p6].every(piece => piece === mark)){
            drawLine(hor1 - CWidth * (1 / 11), hor3 + CWidth * (1 / 11), ver2, ver2);
            return true;
        }
        else if([p7, p8, p9].every(piece => piece === mark)){
            drawLine(hor1 - CWidth * (1 / 11), hor3 + CWidth * (1 / 11), ver3, ver3);
            return true;
        }
        //Columns
        else if([p1, p4, p7].every(piece => piece === mark)){
            drawLine(hor1, hor1, ver1 - CHeight * (1 / 11), ver3 + CHeight * (1 / 11));
            return true;
        }
        else if([p2, p5, p8].every(piece => piece === mark)){
            drawLine(hor2, hor2, ver1 - CHeight * (1 / 11), ver3 + CHeight * (1 / 11));
            return true;
        }
        else if([p3, p6, p9].every(piece => piece === mark)){
            drawLine(hor3, hor3, ver1 - CHeight * (1 / 11), ver3 + CHeight * (1 / 11));
            return true;
        }
        //Diagonal
        else if([p1, p5, p9].every(piece => piece === mark)){
            drawLine(hor1 - CWidth * (1 / 11), hor3 + CWidth * (1 / 11), ver1 - CHeight * (1 / 11), ver3 + CHeight * (1 / 11));
            return true;
        }
        else if([p3, p5, p7].every(piece => piece === mark)){
            drawLine(hor1 - CWidth * (1 / 11), hor3 + CWidth * (1 / 11), ver3 + CHeight * (1 / 11), ver1 - CHeight * (1 / 11));
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
    return {claimPiece, resetBoard, winCondition, fullBoardCheck, checkClaim, claimPieceRobot};
})()

const gameController = (() => {
    let player1 = null;
    let player2 = null;
    let toggle = false;
    let resetBoolean = false;
    let buttonBoolean = false;
    let round = 0;

    const resetWaiter = () => {
        let BUTTON_TIME = 2000;
        if(buttonBoolean) BUTTON_TIME = 400;
        else BUTTON_TIME = 2000;
        resetBoolean = true
        setTimeout(() => {
            resetBoolean = false
        }, BUTTON_TIME);
        buttonBoolean = false;
    }

    const setUp = () => {
        const player1Name = localStorage.getItem("player1Name");
        const player2Name = localStorage.getItem("player2Name");
        const player1Type = localStorage.getItem("player1Type");
        const player2Type = localStorage.getItem("player2Type");
        const player1Mark = localStorage.getItem("player1Mark");
        const player2Mark = localStorage.getItem("player2Mark");
        const player1Diff = localStorage.getItem("player1Diff");
        const player2Diff = localStorage.getItem("player2Diff");
        if(player1Mark === "X"){
            player1 = makePlayer(player1Name, player1Type, player1Mark, player1Diff);
            player1Name.title = player1Name;
            player2 = makePlayer(player2Name, player2Type, player2Mark, player2Diff);
            player2Name.title = player2Name;
        }
        else if(player1Mark === "O"){
            player1 = makePlayer(player2Name, player2Type, player2Mark, player2Diff);
            player1Name.title = player2Name;
            player2 = makePlayer(player1Name, player1Type, player1Mark, player1Diff);
            player2Name.title = player1Name;
        }
        else{
            player1 = makePlayer("PLAYER1", "human", "X");
            player2 = makePlayer("PLAYER2", "human", "O");
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
            let buttonReset = "y";
            round = 0;
            toggle = false;
            buttonBoolean = true;
            gameBoard.resetBoard(player1, buttonBoolean, buttonReset);
            resetWaiter();
        })
        rematch.addEventListener("click", () => {
            if(toggle){
                statContCurrent();
            }
            let buttonReset = "y";
            player1.score = 0;
            player2.score = 0;
            winText1.textContent = "WINS"
            winNumber1.textContent = player1.score;
            winText2.textContent = "WINS"
            winNumber2.textContent = player2.score;
            round = 0;
            toggle = false;
            buttonBoolean = true;
            gameBoard.resetBoard(player1, buttonBoolean, buttonReset);
            resetWaiter();
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
                if(resetBoolean) return
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
                pc.classList.add("fade");
                setTimeout(() => {
                pc.classList.remove("blue", "yellow", "fade");
                pc.textContent = " ";
                }, 200)
            });
        });
        pieces.forEach(pc => {
                pc.addEventListener("click", () => {
                    id = Number(pc.id.match(/\d+/)[0]);
                    if(gameBoard.checkClaim(id)){
                        return;
                    }
                    if(resetBoolean) return
                    // if(player1.diff !== null && !toggle){
                    //     playRobot(player1);
                    //     return;
                    // }
                    // if(player2.diff !== null && toggle){
                    //     playRobot(player2);
                    //     return;
                    // }
                    round += 1;
                    toggle = !toggle
                    
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
                            round = 0;
                            gameBoard.resetBoard(player1, buttonBoolean);
                            resetWaiter();
                        }
                        else if(gameBoard.fullBoardCheck()){
                            toggle = !toggle
                            currentPlayer.textContent = "DRAW";
                            afterVictory.textContent = `${player1.name}'S TURN`;
                            gameBoard.resetBoard(player1, buttonBoolean);
                            resetWaiter();
                        }
                        if(player2.diff !== null)playRobot(player2);
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
                            round = 0;
                            gameBoard.resetBoard(player1, buttonBoolean);
                            resetWaiter();
                        }
                    }
                    if(player1.diff !== null)playRobot(player1);
                    if(round < 9)statContCurrent();
                    else round = 0;
                });
        });
    }
    const statContCurrent = () => {
        const currentTurnX = document.querySelector(".currentTurnX");
        const currentTurnO = document.querySelector(".currentTurnO");
        currentTurnX.classList.toggle("opacityUpX");
        currentTurnO.classList.toggle("opacityUpO");
    }
    const playRobot = (player) => {
        console.log("clanker moves")
    }
    const startRobot = () => {
        setTimeout(() => {
            if(player1.diff !== null) playRobot();
        }, 1000);
    }

  return {setUp, setListeners, startRobot}
})()

function makePlayer(name, type, mark, diff){
    return{
        name,
        type,
        mark,
        diff,
        score: 0
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.offsetHeight;
    document.body.style.opacity = "1";
})
gameController.setUp()
gameController.setListeners()
gameController.startRobot()