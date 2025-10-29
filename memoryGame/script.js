let numbercheck ;
let timeCount = 0;
let numberCardes ;

let listCorrect ;
let listCard ;
const gameBoard = document.getElementById('gameBoard');
let a = -1;
let b = -1;
let c = 0;

let timer;




function startNewGame() {
  const levelSelect = document.getElementById("levelSelect").value;
  numberCardes =parseInt(levelSelect);
  StartGame();
}

function StartGame() {
  genereTime();
  gameBoard.innerHTML = "";
  listCard = [];
  listCorrect = [];
  numbercheck = 0;
  document.querySelector(".moves").innerText = `Moves: 0`;

  for (let i = 1; i <= numberCardes; i++) {
    gameBoard.innerHTML += `
      <div class="cader" id="cader${i}">
        <div class="card">
          <div class="card-inner" id="card${i}">
            <div class="card-front"></div>
            <div class="card-back"></div>
          </div>
        </div>
      </div>
    `;
  }

  const cardInners = document.querySelectorAll(".card-inner");

  cardInners.forEach(card => {
    let nImgeA = genereNumber();
    listCard.push(nImgeA);
  });

  for (let i = 0; i < listCard.length; i++) {
    const cardInner = cardInners[i];
    const back = cardInner.querySelector(".card-back");
    back.classList.add("img" + listCard[i]);
    addFlipEvent(cardInner, i);
  }
}

function genereTime() {
  clearInterval(timer);
  timeCount = 0;
  timer = setInterval(() => {
    timeCount++;
    document.querySelector(".timer").innerText = `Time: ${timeCount}s`;
  }, 1000);
}

function genereNumber() {
  let nImge = Math.floor(Math.random() * (numberCardes / 2)) + 1;
  let count = listCard.filter(x => x === nImge).length;
  if (count < 2) return nImge;
  return genereNumber();
}

function addFlipEvent(cardInner, i) {
  cardInner.addEventListener("click", function () {
    if (cheangeBackgrounde2(i)) {
      numbercheck++;
      document.querySelector(".moves").innerText = `Moves: ${numbercheck}`;
      cardInner.classList.add("flipped");
    }
  });
}

function cheangeBackgrounde2(i) {
    console.log(listCorrect);
    console.log(i);
  if (listCorrect.includes(i)) return false;
  if (i === a) return false;

  if (c === 0) {
    a = i;
    c++;
  } else if (c === 1) {
    b = i;
    c++;
    setTimeout(() => {
      checkMatch();
    }, 800);
  }
  return true;
}

function checkMatch() {
  const cardInners = document.querySelectorAll(".card-inner");

  if (listCard[a] === listCard[b]) {
    listCorrect.push(a);
    listCorrect.push(b);
  } else {
    cardInners[a].classList.remove("flipped");
    cardInners[b].classList.remove("flipped");
  }

  a = -1;
  b = -1;
  c = 0;
  StopedGame();
}

function resetGame() {
  location.reload();
}

function StopedGame() {
  if (listCorrect.length === numberCardes) {
    clearInterval(timer);
    setTimeout(() => {
      alert(` Game Over!\nMoves: ${numbercheck}\nTime: ${timeCount}s`);
    }, 500);
    addDataInHistory();
  }
}

function addDataInHistory() {
    let historyData = localStorage.getItem('gameHistory') || '[]';

    historyData = JSON.parse(historyData);
    const newRecord = {
        level: GenereLevel(),
        moves: numbercheck,
        time: timeCount
    };
    historyData.push(newRecord);
    localStorage.setItem('gameHistory', JSON.stringify(historyData));
}

function GenereLevel() {
    switch (numberCardes) {
        case 8 :
            return 1;
        case 12 :
            return 2;
        case 16 :
            return 3;
        case 20 :
            return 4;
        case 24 :
            return 5;
        default :
            return 0;
    }

}

window.onload = function() {
    const historyData = localStorage.getItem('gameHistory') || '[]';
    const historyRecords = JSON.parse(historyData);
    const historyContainer = document.getElementById('historyRecords');
    historyRecords.forEach(record => {
        const row = document.createElement('div');
        row.classList.add('historyRow');
        row.innerHTML = `
            <div class="historyLevel">Level: ${record.level}</div>
            <div class="historyMoves">Moves: ${record.moves}</div>
            <div class="historyTime">Time: ${record.time}s</div>
        `;
        historyContainer.appendChild(row);
    });
};

