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

const p1 = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quis illum eos molestiae molestias esse neque dolorem illo maiores ut laborum, aliquam voluptatum hic temporibus quaerat iste est rerum recusandae?";


for (let i = 0; i < p1.length; i++) {
    textDisplay.innerHTML += `<strong id="caracter${i}">${p1[i]}</strong>`
}




textInput.addEventListener("keydown", (e) => {
    if (conteur == 0) {
        genereTimer();
    }
    if (e.key == "CapsLock" || e.key == "Shift" || e.key == "Tab" || e.key == "Control" || e.key == "Alt") {
        return
    }
    if (e.key == "Backspace") {
        removeCaracter(conteur - 1);
        conteur--;
        return;
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
        timeEl.innerText = `${time}`;
        time--;

        StopedGame();
    }, 1000);
}

function StopedGame() {
    if (time < 0) {
        clearInterval(timer);
        textInput.disabled = true;
        let wpm = Math.round((conteuCaracters / 5));
        let accuracy = Math.round(((conteuCaracters - conterAccurace) / conteuCaracters) * 100);
        wpmEl.innerText = `${wpm}`;
        accEl.innerText = `${accuracy}`;

    }
}




