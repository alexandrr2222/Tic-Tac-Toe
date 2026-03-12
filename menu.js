const player1_X = document.querySelector("#x1");
const player1_O = document.querySelector("#o1");
const player2_X = document.querySelector("#x2");
const player2_O = document.querySelector("#o2");
const XOs = document.querySelectorAll(".xoSelector");
XOs.forEach(element => {
    element.addEventListener("click", () => {
        if(element.id === "o1" && player2_O.checked === true){
            player2_O.checked = false;
            player2_X.checked = true;
        }
        else if(element.id === "o2" && player1_O.checked === true){
            player1_O.checked = false;
            player1_X.checked = true;
        }
        else if(element.id === "x1" && player2_X.checked === true){
            player2_O.checked = true;
            player2_X.checked = false;
        }
        else if(element.id === "x2" && player1_X.checked === true){
            player1_O.checked = true;
            player1_X.checked = false;
        }
    });
});
