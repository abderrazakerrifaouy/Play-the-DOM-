const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");

let conteur = 0;
let time = 60;

const p1 = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quis illum eos molestiae molestias esse neque dolorem illo maiores ut laborum, aliquam voluptatum hic temporibus quaerat iste est rerum recusandae?";


for (let i = 0; i < p1.length; i++) {
    textDisplay.innerHTML += `<strong id="caracter${i}">${p1[i]}</strong>`
}




textInput.addEventListener("keydown", (e) => {
     if (e.key  == "CapsLock" || e.key  == "Shift" || e.key  == "Tab" ||  e.key  == "Control" || e.key  == "Alt"){ 
        return
    }
    if(e.key == "Backspace"){
        removeCaracter(conteur-1);
        conteur--;
        return;
    }
      checkCaracter(e.key , conteur);
      conteur++;
});



function checkCaracter(caracter , index) {
    const str = document.getElementById(`caracter${index}`)
    if (caracter == p1[index]) {
        str.classList.add("correct");
    }
    else{
        str.classList.add("incorrect");
    }
}

function removeCaracter(index) {
    const str = document.getElementById(`caracter${index}`)
    str.classList.remove("correct");
    str.classList.remove("incorrect");
    
}
function startGame() {
    conteur = 0;
    time = 60;
    textInput.value = "";
    wpmEl.innerText = `WPM: ${0}`;
    accEl.innerText = `Accuracy: ${0}%`;
    timeEl.innerText = `Time: ${time}s`;
    const allCaracter = textDisplay.querySelectorAll("strong");
    allCaracter.forEach((el) => {
        el.classList.remove("correct");
        el.classList.remove("incorrect");
    });
}
