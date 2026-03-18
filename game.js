const gameBoard = (() => {
    let gameBoardPieces = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const claimPiece = (player, id) => {
        const drawPiece = document.querySelector(`#P${id}`);
        if(player.mark === "X") drawPiece.textContent = "X";
        else if(player.mark === "O") drawPiece.textContent = "O";
        gameBoardPieces[id - 1] = player.mark;
    }
    const claimPieceRobot = (player) => {

        function CheckEnemy(pc1, pc2, pc3, number1, number2, number3, mode){
            let checkMark = null;
            if(player.mark === "X"){
                if(mode === "hard") checkMark = "X";
                else checkMark = "O";
            }
            else{
                if(mode === "hard") checkMark = "O";
                else checkMark = "X";
            }
            let workArray = [pc1, pc2, pc3];
            if(!workArray.includes(" ")) return false;
            let filteredArray = workArray.filter((pc) => {
                return pc === checkMark
            })
            if(filteredArray.length === 2){
                let chosenNum = null;
                const emptySpot = workArray.indexOf(" ");
                if(emptySpot === 0) chosenNum = number1
                else if(emptySpot === 1) chosenNum = number2
                else if(emptySpot === 2) chosenNum = number3

                gameBoardPieces[chosenNum - 1] = player.mark;
                const drawPiece = document.querySelector(`#P${chosenNum}`);
                if(player.mark === "X"){
                    drawPiece.classList.add("blueClaim");
                    drawPiece.textContent = "X";
                }
                else if(player.mark === "O"){
                    drawPiece.classList.add("yellowClaim");
                    drawPiece.textContent = "O";
                }
                return true;
            }
        }
        function chooseRandom(){
            const emptyIndexes = [];
            for(const[index, item] of gameBoardPieces.entries()){
                if(item === " "){
                    emptyIndexes.push(index)
                }
            }
            let randomIndex = Math.floor(Math.random() * emptyIndexes.length);
            let claimedPiece = emptyIndexes[randomIndex]
            gameBoardPieces[claimedPiece] = player.mark;
            const drawPiece = document.querySelector(`#P${claimedPiece+1}`);
            if(player.mark === "X"){
                    drawPiece.classList.add("blueClaim");
                    drawPiece.textContent = "X";
            }
            else if(player.mark === "O"){
                drawPiece.classList.add("yellowClaim");
                drawPiece.textContent = "O";
            }
        }

        if(player.diff === "EASY"){
            chooseRandom()
        }
        else if(player.diff === "MEDIUM"){
            const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = gameBoardPieces;

            if(CheckEnemy(p1, p2, p3, 1, 2, 3))return
            else if(CheckEnemy(p4, p5, p6, 4, 5, 6))return
            else if(CheckEnemy(p7, p8, p9, 7, 8, 9))return

            else if(CheckEnemy(p1, p4, p7, 1, 4, 7))return
            else if(CheckEnemy(p2, p5, p8, 2, 5, 8))return
            else if(CheckEnemy(p3, p6, p9, 3, 6, 9))return

            else if(CheckEnemy(p1, p5, p9, 1, 5, 9))return
            else if(CheckEnemy(p3, p5, p7, 3, 5, 7))return
            else chooseRandom()

        }
        else if(player.diff === "HARD"){
            const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = gameBoardPieces;
            
            if(CheckEnemy(p1, p2, p3, 1, 2, 3, "hard"))return
            else if(CheckEnemy(p4, p5, p6, 4, 5, 6, "hard"))return
            else if(CheckEnemy(p7, p8, p9, 7, 8, 9, "hard"))return

            else if(CheckEnemy(p1, p4, p7, 1, 4, 7, "hard"))return
            else if(CheckEnemy(p2, p5, p8, 2, 5, 8, "hard"))return
            else if(CheckEnemy(p3, p6, p9, 3, 6, 9, "hard"))return

            else if(CheckEnemy(p1, p5, p9, 1, 5, 9, "hard"))return
            else if(CheckEnemy(p3, p5, p7, 3, 5, 7, "hard"))return

            else if(CheckEnemy(p1, p2, p3, 1, 2, 3))return
            else if(CheckEnemy(p4, p5, p6, 4, 5, 6))return
            else if(CheckEnemy(p7, p8, p9, 7, 8, 9))return

            else if(CheckEnemy(p1, p4, p7, 1, 4, 7))return
            else if(CheckEnemy(p2, p5, p8, 2, 5, 8))return
            else if(CheckEnemy(p3, p6, p9, 3, 6, 9))return

            else if(CheckEnemy(p1, p5, p9, 1, 5, 9))return
            else if(CheckEnemy(p3, p5, p7, 3, 5, 7))return
            else chooseRandom()
        }
    }
    const checkClaim = (id) => {
        if(gameBoardPieces[id - 1] !== " ") return true;
        else return false
    }
    const resetBoard = (player2, player1, buttonBoolean, br) => {
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
                    if(player1.diff !== null || player2.diff !== null){
                        currentPlayer.style.display = "none";
                    }
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
            ctx.shadowBlur = 0;
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
            if(player1Diff !== null && player2Diff !== null){
                player1 = makePlayer(player1Diff + " BOT", player1Type, player1Mark, player1Diff);
                player1Name.title = player1Diff + " BOT";
                player2 = makePlayer(player2Diff + " BOT", player2Type, player2Mark, player2Diff);
                player2Name.title = player2Diff + " BOT";
            }
            else{
            player1 = makePlayer(player1Name, player1Type, player1Mark, player1Diff);
            player1Name.title = player1Name;
            player2 = makePlayer(player2Name, player2Type, player2Mark, player2Diff);
            player2Name.title = player2Name;
            }
        }
        else if(player1Mark === "O"){
            if(player1Diff !== null && player2Diff !== null){
                player1 = makePlayer(player2Diff + " BOT", player2Type, player2Mark, player2Diff);
                player1Name.title = player2Diff + " BOT";
                player2 = makePlayer(player1Diff + " BOT", player1Type, player1Mark, player1Diff);
                player2Name.title = player1Diff + " BOT";
            }
            else{
            player1 = makePlayer(player2Name, player2Type, player2Mark, player2Diff);
            player1Name.title = player2Name;
            player2 = makePlayer(player1Name, player1Type, player1Mark, player1Diff);
            player2Name.title = player1Name;
            }
        }
        else{
            player1 = makePlayer("PLAYER1", "human", "X");
            player2 = makePlayer("PLAYER2", "human", "O");
        }
        const insertPlayer1Name = document.querySelector(".playerName1");
        const insertPlayer2Name = document.querySelector(".playerName2");
        insertPlayer1Name.textContent = player1.name;
        insertPlayer2Name.textContent = player2.name;
        const currentPlayer = document.querySelector(".currentTurnPlayerNameInsert");
        currentPlayer.textContent = `${player1.name}'S TURN`;
    }

    const onWin = (player) => {
        const currentPlayer = document.querySelector(".currentTurnPlayerNameInsert");
        const winNumber1 = document.querySelector(".winNumber1");
        const winNumber2 = document.querySelector(".winNumber2");
        const winText1 = document.querySelector(".winText1");
        const winText2 = document.querySelector(".winText2");
        const afterVictory = document.querySelector(".afterVictory")
        player.score += 1;
        if(player.mark === "X"){
            toggle = !toggle
            statContCurrent();
            currentPlayer.style.display = "block"
            currentPlayer.style.color = "#00EEC5"
            currentPlayer.style.textShadow = "0 0 25px #00EEC5"
            if(player.score === 1) winText1.textContent = "WIN"
            else winText1.textContent = "WINS"
            winNumber1.textContent = player.score;
        }
        else{
            currentPlayer.style.display = "block"
            currentPlayer.style.color = "#E6D172"
            currentPlayer.style.textShadow = "0 0 25px #E6D172"
            if(player.score === 1) winText2.textContent = "WIN"
            else winText2.textContent = "WINS"
            winNumber2.textContent = player.score;
        }
        currentPlayer.textContent = `${player.name} CLAIMS VICTORY!`;
        currentPlayer.style.transition = "0.3s ease"
        afterVictory.textContent = `${player1.name}'S TURN`;
        round = 0;
        gameBoard.resetBoard(player2, player1, buttonBoolean);
        resetWaiter();
    }
    const onDraw = () => {
        const currentPlayer = document.querySelector(".currentTurnPlayerNameInsert");
        const afterVictory = document.querySelector(".afterVictory")
        toggle = !toggle
        if(player1.diff !== null || player2.diff !== null)currentPlayer.style.display = "block"
        currentPlayer.textContent = "DRAW";
        afterVictory.textContent = `${player1.name}'S TURN`;
        gameBoard.resetBoard(player2, player1, buttonBoolean);
        resetWaiter();
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
        if(player1.diff !== null || player2.diff !== null){
            currentPlayer.style.display = "none"
            afterVictory.style.display = "none"
        }
        newGame.addEventListener("click", () => {
            if(toggle){
                statContCurrent();
            }
            let buttonReset = "y";
            round = 0;
            toggle = false;
            buttonBoolean = true;
            gameBoard.resetBoard(player2, player1, buttonBoolean, buttonReset);
            resetWaiter();
            if(player1.diff !== null)startRobot()
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
            gameBoard.resetBoard(player2, player1, buttonBoolean, buttonReset);
            resetWaiter();
            if(player1.diff !== null)startRobot()
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
                if(player1.diff !== null && !toggle) return
                if(player2.diff !== null && toggle) return
                if(player1.diff !== null && player2.diff !== null)return
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
                if(player1.diff !== null && !toggle) return
                if(player2.diff !== null && toggle) return
                if(player1.diff !== null && player2.diff !== null)return
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
                    if(player1.diff !== null && player2.diff !== null)return
                    if(player1.diff !== null && !toggle) return
                    if(player2.diff !== null && toggle) return
                    if(player1.diff !== null || player2.diff !== null){
                        currentPlayer.style.display = "none"
                        afterVictory.style.display = "none"
                    }
                    id = Number(pc.id.match(/\d+/)[0]);
                    if(gameBoard.checkClaim(id)){
                        return;
                    }
                    if(resetBoolean) return
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
                            currentPlayer.textContent = `${player1.name}'S TURN`;
                            onWin(player1)
                            
                        }
                        else if(gameBoard.fullBoardCheck()){
                            currentPlayer.textContent = `${player1.name}'S TURN`;
                            onDraw();
                            
                        }
                        else if(player2.diff !== null){
                            playRobot(player2);
                        }
                    }
                    else if(!toggle){
                        pc.classList.remove("yellow");
                        pc.classList.add("yellowClaim");
                        currentPlayer.textContent = `${player1.name}'S TURN`;
                        currentPlayer.style.transition = "none"
                        gameBoard.claimPiece(player2, id)
                        if(gameBoard.winCondition(player2.mark)){
                            currentPlayer.textContent = `${player1.name}'S TURN`;
                            onWin(player2);
                            setTimeout(() => {
                                playRobot(player1);
                            }, 2500);
                        }
                        else if(player1.diff !== null) playRobot(player1);
                        
                    }
                    if(round < 9)statContCurrent();
                    else round = 0;
                });
        });
    }
    const statContCurrent = () => {
        const currentTurnX = document.querySelector(".currentTurnX");
        const currentTurnO = document.querySelector(".currentTurnO");
        if(player1.diff !== null && player2.diff === null){
            currentTurnX.classList.remove("opacityUpX");
            currentTurnO.classList.add("opacityUpO");
        }
        else if(player2.diff !== null && player1.diff === null){
            currentTurnX.classList.add("opacityUpX");
            currentTurnO.classList.remove("opacityUpO");
        }
        else{
        currentTurnX.classList.toggle("opacityUpX");
        currentTurnO.classList.toggle("opacityUpO");
        }
    }
    const playRobot = (player) => {
        const currentPlayer = document.querySelector(".currentTurnPlayerNameInsert");
        const afterVictory = document.querySelector(".afterVictory");
        round += 1;
        toggle = !toggle
        currentPlayer.style.display = "none"
        afterVictory.style.display = "none"
        gameBoard.claimPieceRobot(player);
        if(round < 9)statContCurrent();
        else round = 0;
        if(gameBoard.winCondition(player.mark)){
            onWin(player)
            if(player.mark === "X" && (player1.diff !== null)){
                setTimeout(() => {
                    playRobot(player1)
                }, 2500);
            }
            else if(player.mark === "O" && (player1.diff !== null && player2.diff !== null)){
                setTimeout(() => {
                    playRobot(player1)
                }, 2500);
            }
        }
        else if(gameBoard.fullBoardCheck()){
            onDraw();
            if(player.mark === "X"){
                setTimeout(() => {
                    playRobot(player1)
                }, 2500);
            }
        }
        else if(player1.diff !== null && player2.diff !== null){
            setTimeout(() => {
                if(toggle){
                playRobot(player2)
                }
                else if(!toggle){
                    playRobot(player1)
                }
            }, 500);
        }
        
    }
    const startRobot = () => {
        setTimeout(() => {
            if(player1.diff !== null) playRobot(player1);
        }, 1500);
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