// custom select menu
const selectMenu = (() => {

})()
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
const start = document.querySelector(".startButton");
start.addEventListener("click", () => {
    if(name1.value.trim() === "" || name2.value.trim() === ""){
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
    localStorage.setItem("player1Name", document.querySelector("#name1").value.toUpperCase());
    localStorage.setItem("player2Name", document.querySelector("#name2").value.toUpperCase());

    localStorage.setItem("player1Type", document.querySelector(".HumRobSel1:checked").value);
    localStorage.setItem("player2Type", document.querySelector(".HumRobSel2:checked").value);

    localStorage.setItem("player1Mark", document.querySelector(".xoSel1:checked").value);
    localStorage.setItem("player2Mark", document.querySelector(".xoSel2:checked").value);
    window.location.href = "game.html";
});