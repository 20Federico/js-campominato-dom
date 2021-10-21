
//recupera l'elemento in cui dovrai creare le celle
const campoContainer = document.querySelector('.campo_container');
// recupera l'elemento select
const selectLevel = document.querySelector('nav select');
// recupera l'elemento bottone
const btnPlay = document.querySelector('nav button');
////array che deve contenere tutti i numeri fino al nmax di caselle in base al livello
let arrayCells;

// eventListener al click del bottone che visalizza il valore della select
btnPlay.addEventListener('click', 
function() {
  
  //reupera il valore che indica il livello del gioco dalla select
  const level = selectLevel.value;

  const cellsNumber = getCellNumber(level);

  notBombCells(cellsNumber, 16);
  
  toCreateCells(cellsNumber);

});

//funzione che in base al livello trova il numero di celle da stampare
function getCellNumber(level) {

  let result

  switch(level) {
    case 'facile':
      result = 49;
      break;
    case 'medio':
      result = 81;
      break;
    case 'difficile':
      result = 100;
      break;
  }

  return result
};

//funzione che determina un array contenente le celle che NON contengono bombe
function notBombCells(cellsNumber, nBombCells, ) {
  //ciclo che nserisce tutti i numeri nell'array
  arrayCells = [];

  for (let i = 1; i <= cellsNumber; i++) { //metti cellsNumber al posto del numero
    arrayCells.push(i);
  }
  //ciclo ripetuto per n volte, in cui n sta per il numero di bombe che voglio
  //per ogni bomba che voglio creare, genero un numero random per posizionarla casualmente
  for (let i = 0; i < nBombCells; i++) { 
    const nChoosenRandomly = randomNumber(1, cellsNumber)
    arrayCells.splice(nChoosenRandomly - 1, 1);
    cellsNumber--;
  }
  console.log(arrayCells);
}

//funzione che determina il ciclo per creare le celle
function toCreateCells(cellsNumber)  {

  campoContainer.innerHTML = '';
  
  const cellSize = 100 / Math.sqrt(cellsNumber);

  for (let i = 0; i < cellsNumber; i++) {
    const newCell = document.createElement('div');
    campoContainer.append(newCell);
    newCell.classList.add('box');
    newCell.style.width = cellSize + '%';
    newCell.style.height = cellSize + '%';
    newCell.textContent = i + 1;
    newCell.setAttribute('index', i + 1);
    newCell.setAttribute('clicked', 'false');
    newCell.addEventListener('click', newCellActive);
  }
};

let score = 0;
//event listener al click di una cella per cambiare il colore di background 
function newCellActive() {

  const cellPosition = this.getAttribute('index');
  this.style.color = 'white';

  if (this.getAttribute('clicked') === 'true') {
    return;
  }
  
  if (arrayCells.includes(parseInt(cellPosition))) {

    this.style.backgroundColor = '#6495ED';
    score++;
    console.log(score);
    this.setAttribute('clicked', 'true');

  } else {
    this.style.backgroundColor = 'red';
    setTimeout(gameOver, 1);
  }

  setTimeout(gameCompleted, 1);
  
}

function gameCompleted() {
  if (score === arrayCells.length) {
    score = 0;
    
    const bomb = document.querySelectorAll('div.box[clicked=false]')
    for (let i = 0; i < bomb.length; i++) {
      const bombElement = bomb[i];
      bombElement.style.backgroundColor = 'red';  
    }
    setTimeout(gameCompletedMsg, 100);  
  }
}

function gameCompletedMsg() {
  
  alert('complimenti! Hai vinto!!')
  campoContainer.innerHTML = '';

}

function gameOver() {

  alert(`peccato, sei esploso. Hai ottenuto un punteggio di ${score} su ${arrayCells.length}`);
  campoContainer.innerHTML = '';
  score = 0;

};

//funzione che genera un numero random, dato un range
function randomNumber(minNumber, maxNumber) {
  
  const randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  return randomNum;

};