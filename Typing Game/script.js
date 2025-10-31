const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");

let conteuCaracters = 0;
let conterAccurace = 0;
let conteur = 0;
let time = 60;
let timer;
let Paragraph = [ "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. ",
"Typing is a fundamental skill that is essential in today's digital world.",
"Practice makes perfect, so keep typing to improve your speed and accuracy.",
"JavaScript is a versatile programming language used for web development.",
"Consistent practice can lead to significant improvements in typing proficiency."
];
const p1 = Paragraph[genereNumber()];


for (let i = 0; i < p1.length; i++) {
    textDisplay.innerHTML += `<strong id="caracter${i}">${p1[i]}</strong>`
}




textInput.addEventListener("keydown", (e) => {
    StopedGame()
    if (e.key == "CapsLock" || e.key == "Shift" || e.key == "Tab" || e.key == "Control" || e.key == "Alt") {
        return
    }
    if (e.key == "Backspace") {
        removeCaracter(conteur - 1);
        conteur--;
        return;
    }
    if (conteur == 0) {
        genereTimer();
    }
    checkCaracter(e.key, conteur);
    conteur++;
    conteuCaracters++;
});



function checkCaracter(caracter, index) {
    const str = document.getElementById(`caracter${index}`)
    if (caracter == p1[index]) {
        str.classList.add("correct");
    }
    else {
        conterAccurace++;
        str.classList.add("incorrect");
    }
}

function removeCaracter(index) {
    const str = document.getElementById(`caracter${index}`)
    if (str.classList.contains("incorrect")) {
        conterAccurace--;
        str.classList.remove("incorrect");
    }
    else {
        str.classList.remove("correct");
    }


}

function genereTimer() {
    timer = setInterval(() => {

        time--;
        timeEl.innerText = `${time}`;
        StopedGame();
        if (time <= 0) StopedGame() ;
    }, 1000);
}

function StopedGame() {
    if (time <= 0 || conteur == p1.length) {
        clearInterval(timer);
        textInput.disabled = true;
        let wpm = Math.round(conteuCaracters / 5);
        let accuracy = Math.round(((conteuCaracters - conterAccurace) / conteuCaracters) * 100);
        wpmEl.innerText = `${wpm}`;
        accEl.innerText = `${accuracy}`;

    }
}


function genereNumber() {
  let nParagraph  = Math.floor(Math.random() * 4);
  return nParagraph;
}
