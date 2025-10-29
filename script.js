
let numbercheck = 0;
let listCorrect = [];
const listCard = [];
const gameBoard = document.getElementById('gameBoard');
let a = 0;
let b = 0;
let c = 0;
let numberCardes = 12;



for (let i = 1; i <= numberCardes; i++) {
    gameBoard.innerHTML += `
    <div class="cader" id= "cader${i}">
    <div class="card " id="card${i}"></div>
    </div>
    `
}
const cards = document.querySelectorAll('.card');

function genereNumber() {
    let nImge = Math.floor(Math.random() * numberCardes / 2) + 1;
    let conture = 0
    for (let i = 0; i < listCard.length; i++) {
        if (listCard[i] == nImge) {
            conture++
        }
    }
    if (conture < 2) {
        return nImge
    }

    return genereNumber()
}

cards.forEach(card => {
    let nImgeA = genereNumber()
    listCard.push(nImgeA)
});


for (let i = 0; i < listCard.length; i++) {
    cheangeBackgrounde(cards[i], i)
}
function checkIsCorrect(index) {
    if (listCorrect.includes(index)) {
    return false
   }
  return true
}

function cheangeBackgrounde2(i) {
    
    if (checkIsCorrect(i)) {
        if (i === a) {
           return false 
        }
        if (c == 2) {
            if (listCard[a] == listCard[b]) {
                listCorrect.push(a);
                listCorrect.push(b)
                a = 0;
                b = 0;
                c = 0;

            } else {
                cards[a].classList.remove('img' + listCard[a])
                cards[b].classList.remove('img' + listCard[b])
                a = 0;
                b = 0;
                c = 0;
            }
        }
        if (c == 0) {
            a = i
            c++
        } else if (c == 1) {
            b = i
            c++
        }
        return true
    }
    return false


}


function cheangeBackgrounde(card, i) {

    return card.addEventListener("click", function () {
        let check = cheangeBackgrounde2(i);
        
        if (check) {
            numbercheck++
            document.getElementsByClassName("moves")[0].innerText = `Moves: ${numbercheck}`;
            cards[i].classList.add('img' + listCard[i]);
        }else{
            alert("the deja saved")
        }

    })
}