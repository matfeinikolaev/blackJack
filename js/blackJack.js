const suits = ['C', 'D', 'H', 'S'];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 'A', 'J', 'Q', 'K'];
const myCards = $('#myCards');
const enemyCards = $('#enemyCards');
var res = 0, resEnem = 0;
const loadMyCards = {
  loadCards() {
    eraseAll();
    let num1 = loadMyCards.loadFirstCard();
    let num2 = loadMyCards.loadSecondCard();
    loadEnemyCards.loadCards();
    res = count(num1,num2);
  },
  loadFirstCard() {
    let num1 = numChoice();
    let suit1 = suitChoice();
    let card1 = $("<img></img>").attr('src','img/' + num1 + suit1 + '.svg').attr('id', 'card1');
    myCards.append(card1);
    return num1;
  },
  loadSecondCard() {
    let num2 = numChoice();
    let suit2 = suitChoice();
    let card2 = $("<img></img>").attr('src','img/' + num2 + suit2 + '.svg').attr('id', 'card2');
    myCards.append(card2);
    return num2;
  },
}

const loadEnemyCards =  {
  enem1: $("<img></img>"),
  enem2: $("<img></img>"),
  loadCards() {
    let numEnem1 = loadEnemyCards.loadFirstCard();
    let numEnem2 = loadEnemyCards.loadSecondCard();
    resEnem = count(numEnem1,numEnem2);
    loadEnemyCards.checkEnemyCards(resEnem, numEnem1, numEnem2);
  },
  loadFirstCard() {
    let numEnem1 = numChoice();
    let suitEnem1 = suitChoice();
    enemyCards.append(loadEnemyCards.enem1);
    $(loadEnemyCards.enem1).attr('id', 'enem1');
    $(loadEnemyCards.enem1).attr('src', 'img/back.png');
    $(loadEnemyCards.enem1).attr('style', "text-align: left; width: 10%; height: 10%");
    return numEnem1;
  },
  loadSecondCard() {
    let numEnem2 = numChoice();
    let suitEnem2 = suitChoice();
    enemyCards.append(loadEnemyCards.enem2);
    $(loadEnemyCards.enem2).attr('id', 'enem1');
    $(loadEnemyCards.enem2).attr('src', 'img/back.png');
    $(loadEnemyCards.enem2).attr('style', "text-align: left; width: 10%; height: 10%");
    return numEnem2;
  },
  checkEnemyCards(resEnem, numEnem1, numEnem2) {
    if(resEnem!=21){
      if(numEnem1>numEnem2){
        eraseOne(loadEnemyCards.enem1.id);
        loadEnemyCards.loadFirstCard();
      }
      else {
        eraseOne(loadEnemyCards.enem2.id);
        loadEnemyCards.loadSecondCard();
      }
  }
  else victory();
  }
}

const eraseAll = () => {
  let divs = $('div');
  for(let div of divs){
    let imgs = $('img');
    if(imgs[0]!=null)
    for(let img of imgs){
      img.remove();
    }
  }
}
const eraseOne = (id) => {
  let divs = $('div');
  for(let div of divs){
    let one = $('#'+id);
    if(one!=null)
      one.remove();
  }
}

let suitChoice = () => {
  let suit = Math.floor(Math.random() * suits.length);
  return suits[suit];
}

let numChoice = () => {
  let number = Math.floor(Math.random() * numbers.length);
  return numbers[number];
}


const count = (n1, n2) => {
  if(!Number.isInteger(n1)){
    if(n1=='A') n1 = 11;
    else n1 = 10;
  }
  if(!Number.isInteger(n2)){
    if(n2=='A') n2 = 11;
    else n2 = 10;
  }
  let sum = parseInt(n1) + parseInt(n2);
  return sum;
}

let victory = () => {
  if (res!=0){
    eraseAll();
    let youWon = `You have ${res} points, and your enemy has ${resEnem} points! You won!`;
    let youLost = `You have ${res} points, and your enemy has ${resEnem} points! You lost!`;
    if(res==21&&resEnem!=21)
      alert(youWon);
    else if (resEnem==21&&res!=21)
      alert(youLost);
    else if (res>resEnem) 
      alert(youWon);
    else if (res<resEnem) 
      alert(youLost);
    else if (res==resEnem)
      alert(`You both have ${res} points. Let's play again.`);
    res = resEnem = 0;
  }
}

$("#refresh").click(loadMyCards.loadCards);

$("#finish").click(victory);