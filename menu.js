// custom select menu▲
const robotMenu = (() => {
    const swapLogic = () => {
        const nameCont1 = document.querySelector("#name1");
        const nameCont2 = document.querySelector("#name2");
        const robotCont1 = document.querySelector(".robotCont1");
        const robotCont2 = document.querySelector(".robotCont2");
        const human1 = document.querySelector("#human1");
        const human2 = document.querySelector("#human2");
        const robot1 = document.querySelector("#robot1");
        const robot2 = document.querySelector("#robot2");
        const nameDiff1 = document.querySelector(".nameDiff1");
        const nameDiff2 = document.querySelector(".nameDiff2");
        const robotDiff1 = document.querySelector(".robotDiff1");
        const robotDiff2 = document.querySelector(".robotDiff2");
        human1.addEventListener("click", () =>{
            nameDiff1.style.visibility = "visible";
            robotDiff1.style.visibility = "hidden";
            robotCont1.style.display = "none";
            nameCont1.style.display = "block";
        })
        human2.addEventListener("click", () =>{
            nameDiff2.style.visibility = "visible";
            robotDiff2.style.visibility = "hidden";
            robotCont2.style.display = "none";
            nameCont2.style.display = "block";
        })
        robot1.addEventListener("click", () =>{
            nameDiff1.style.visibility = "hidden";
            robotDiff1.style.visibility = "visible";
            robotCont1.style.display = "block";
            nameCont1.style.display = "none";
        })
        robot2.addEventListener("click", () =>{
            nameDiff2.style.visibility = "hidden";
            robotDiff2.style.visibility = "visible";
            robotCont2.style.display = "block";
            nameCont2.style.display = "none";
        })
    }

    const openMenuLogic = () => {
        const robotSelector1 = document.querySelector(".robotSelector1");
        const robotSelector2 = document.querySelector(".robotSelector2");
        const robotSelectorCont1 = document.querySelector(".robotSelectorCont1");
        const robotSelectorCont2 = document.querySelector(".robotSelectorCont2");
        const arrow1 = document.querySelector(".arrowIcon1");
        const arrow2 = document.querySelector(".arrowIcon2");
        robotSelector1.addEventListener("click", () => { 
            if(getComputedStyle(robotSelectorCont1).display === "block"){
                robotSelectorCont1.style.display = "none";
                robotSelector1.classList.remove("open");
                arrow1.classList.remove("openArrow");
            }
            else{
                robotSelectorCont1.style.display = "block";
                robotSelector1.classList.add("open");
                arrow1.classList.add("openArrow");
            }
        });
        robotSelector2.addEventListener("click", () => { 
            if(getComputedStyle(robotSelectorCont2).display === "block"){
                robotSelectorCont2.style.display = "none";
                robotSelector2.classList.remove("open");
                arrow2.classList.remove("openArrow");
            }
            else{
                robotSelectorCont2.style.display = "block";
                robotSelector2.classList.add("open");
                arrow2.classList.add("openArrow");
            }
        });
        document.addEventListener("click", (e) => {
            if(!robotSelector1.contains(e.target)){
                robotSelectorCont1.style.display = "none";
                robotSelector1.classList.remove("open");
                arrow1.classList.remove("openArrow");
            }
            if(!robotSelector2.contains(e.target)){
                robotSelectorCont2.style.display = "none";
                robotSelector2.classList.remove("open");
                arrow2.classList.remove("openArrow");
            }
        });
    }
    const selectMenuItem = () => {
        const diffSub1 = document.querySelectorAll(".diffSub1");
        const diffSub2 = document.querySelectorAll(".diffSub2");
        const textRobot1 = document.querySelector(".textRobot1");
        const textRobot2 = document.querySelector(".textRobot2");
        diffSub1.forEach(dif => {
            dif.addEventListener("click", () => {
                textRobot1.classList.add("afterSel")
                textRobot1.textContent = `${dif.textContent}`
            })
        });
        diffSub2.forEach(dif => {
            dif.addEventListener("click", () => {
                textRobot2.classList.add("afterSel")
                textRobot2.textContent = `${dif.textContent}`
            })
        });
    }

    return {swapLogic, openMenuLogic, selectMenuItem}
})()
robotMenu.swapLogic()
robotMenu.openMenuLogic()
robotMenu.selectMenuItem()
// switch to select menu



// X-O switch
const player1_X = document.querySelector("#x1");
const player1_O = document.querySelector("#o1");
const player2_X = document.querySelector("#x2");
const player2_O = document.querySelector("#o2");
const XOs = document.querySelectorAll(".xoSelector");
XOs.forEach(element => {
    element.addEventListener("click", () => {
        if(element.id === "o1"){
            player2_O.checked = false;
            player2_X.checked = true;
        }
        else if(element.id === "o2"){
            player1_O.checked = false;
            player1_X.checked = true;
        }
        else if(element.id === "x1"){
            player2_O.checked = true;
            player2_X.checked = false;
        }
        else if(element.id === "x2"){
            player1_O.checked = true;
            player1_X.checked = false;
        }
    });
});

// Start Button and data saving
const name1 = document.querySelector("#name1");
const name2 = document.querySelector("#name2");
const textRobot1 = document.querySelector(".textRobot1");
const textRobot2 = document.querySelector(".textRobot2");
const start = document.querySelector(".startButton");
start.addEventListener("click", () => {

    let a = textRobot1.textContent
    console.log(a)


    if((name1.value.trim() === "" && document.querySelector(".HumRobSel1:checked").value === "human" ) || (name2.value.trim() === "" && document.querySelector(".HumRobSel2:checked").value === "human")){
        const warning = document.querySelector(".warning");
        if(warning){
            warning.classList.remove("warning");
            warning.offsetWidth;
            warning.classList.add("warning");
            return;
        }
        else{
            start.insertAdjacentHTML("beforebegin", `<div class="warning">NAME REQUIRED</div>`);
            return;
        }
    }
    if((textRobot1.textContent === "SELECT DIFF." && document.querySelector(".HumRobSel1:checked").value === "robot") || (textRobot2.textContent === "SELECT DIFF." && document.querySelector(".HumRobSel2:checked").value === "robot")){
        const warning2 = document.querySelector(".warning2");
        if(warning2){
            warning2.classList.remove("warning2");
            warning2.offsetWidth;
            warning2.classList.add("warning2");
            return;
        }
        else{
            start.insertAdjacentHTML("beforebegin", `<div class="warning2">SELECT DIFFICULTY</div>`);
            return;
        }
    }
    if(document.querySelector(".HumRobSel1:checked").value === "human"){
        localStorage.setItem("player1Name", document.querySelector("#name1").value.toUpperCase());
    }
    else if(document.querySelector(".HumRobSel1:checked").value === "robot"){
        localStorage.setItem("player1Diff", textRobot1.textContent);
        localStorage.setItem("player1Name", "ROBOT");
    }
    
    if(document.querySelector(".HumRobSel2:checked").value === "human"){
        localStorage.setItem("player2Name", document.querySelector("#name2").value.toUpperCase());
    }
    else if(document.querySelector(".HumRobSel2:checked").value === "robot"){
        localStorage.setItem("player2Diff", textRobot2.textContent);
        localStorage.setItem("player2Name", "ROBOT");
    }


    localStorage.setItem("player1Type", document.querySelector(".HumRobSel1:checked").value);
    localStorage.setItem("player2Type", document.querySelector(".HumRobSel2:checked").value);

    localStorage.setItem("player1Mark", document.querySelector(".xoSel1:checked").value);
    localStorage.setItem("player2Mark", document.querySelector(".xoSel2:checked").value);
    document.body.style.opacity = "0"
    setTimeout(() => {
        window.location.href = "game.html"; 
    }, 1000);
});
document.addEventListener("DOMContentLoaded", () => {
    document.body.offsetHeight;
    document.body.style.opacity = "1";
})