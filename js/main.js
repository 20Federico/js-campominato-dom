
//recupera l'elemento in cui dovrai creare le celle
const campoContainer = document.querySelector('.campo_container');
// recupera l'elemento select
const selectLevel = document.querySelector('nav select');
// recupera l'elemento bottone
const btnPlay = document.querySelector('nav button');

// eventListener al click del bottone che visalizza il valore della select
btnPlay.addEventListener('click', 
function() {
  
  //reupera il valore che indica il livello del gioco dalla select
  const level = selectLevel.value;

  const cellsNumber = getCellNumber(level);

  
  notBombCells(cellsNumber, 16);
  
  let arrayCells;
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
    newCell.addEventListener('click', newCellActive);
  }
};

//funzione che determina un array contenente le celle che NON contengono bombe
function notBombCells(cellsNumber, nBombCells) {
  //array che contiene tutti i numeri fno al nmax di caselle in base al livello
  arrayCells = [];
  //ciclo che nserisce tutti i numeri nell'array
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
  return arrayCells;
}


let score = 0;
//event listener al click di una cella per cambiare il colore di background 
function newCellActive() {
  
  const cellPosition = this.getAttribute('index');
  this.style.color = 'white';

  //const nMaxCellsBlu = cellsNumber - nBombCells;
  //console.log(nMaxCellsBlu);
  
  if (arrayCells.includes(parseInt(cellPosition))) {
    this.style.backgroundColor = '#6495ED';
    score++;
    console.log(score);
    /*
    if (score === cellsNumber - nBombCells) {
      alert('complimenti! Hai vinto!!')
    }
    */

  } else {
    this.style.backgroundColor = 'red';
    setTimeout(endGame, 1);
  }
  
}

function endGame() {

  alert(`peccato, sei esploso. Hai ottenuto un punteggio di ${score}`);
  campoContainer.innerHTML = '';

}





//funzione che genera un numero random, dato un range
function randomNumber(minNumber, maxNumber) {
  const randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  return randomNum
}


//La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
//Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.