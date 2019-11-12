const suits = ['C', 'D', 'H', 'S'];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 'A', 'J', 'Q', 'K'];
const myCards = $('#myCards');
const enemyCards = $('#enemyCards');
var res = 0, resEnem = 0;
var disabled = false;
var gameover = false;
const loadMyCards = {
  num1: 0,
  num2: 0,
  loadCards() {
    eraseAll();
    loadMyCards.num1 = loadMyCards.loadFirstCard();
    loadMyCards.num2 = loadMyCards.loadSecondCard();
    wait();
    res = count(loadMyCards.num1,loadMyCards.num2);
    selection();
  },
  loadFirstCard() {
    let num1 = numChoice();
    let suit1 = suitChoice();
    let card1 = $("<img></img>");
    card1.attr('src','../img/' + num1 + suit1 + '.png')
    .attr('class', 'mycard')
    .attr('id', '1')
    .attr('style', 'width:10%; height:10%');

    myCards.prepend(card1);
    selection();
    return num1;
  },
  loadSecondCard() {
    let num2 = numChoice();
    let suit2 = suitChoice();
    let card2 = $("<img></img>");
    card2.attr('src','../img/' + num2 + suit2 + '.png')
    .attr('class', 'mycard')
    .attr('id', '2')
    .attr('style', 'width:10%; height:10%');
    myCards.append(card2);
    selection();
    return num2;
  },
}

const loadEnemyCards =  {
  enem1: $("<img></img>"),
  enem2: $("<img></img>"),
  numEnem1:0,
  numEnem2:0,
  suitEnem1: '',
  suitEnem2: '',
  loadCards() {
    loadEnemyCards.numEnem1 = loadEnemyCards.loadFirstCard();
    loadEnemyCards.numEnem2 = loadEnemyCards.loadSecondCard();
    resEnem = count(loadEnemyCards.numEnem1,loadEnemyCards.numEnem2);
    loadEnemyCards.checkEnemyCards(resEnem, loadEnemyCards.numEnem1, loadEnemyCards.numEnem2);    
  },
  loadFirstCard(card) {
    let numEnem1 = numChoice();
    loadEnemyCards.suitEnem1 = suitChoice();
    enemyCards.append(loadEnemyCards.enem1);
    $(loadEnemyCards.enem1).attr('id', 'enem1');
    $(loadEnemyCards.enem1).attr('src', '../img/back.png');
    $(loadEnemyCards.enem1).attr('style', "text-align: left; width: 10%; height: 10%");
    return numEnem1;
  },
  loadSecondCard() {
    let numEnem2 = numChoice();
    loadEnemyCards.suitEnem2 = suitChoice();
    enemyCards.append(loadEnemyCards.enem2);
    $(loadEnemyCards.enem2).attr('id', 'enem2');
    $(loadEnemyCards.enem2).attr('src', '../img/back.png');
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
    } else victory();
  }
}

const trigger = () => {
  if(!disabled){
    gameover = false;
    loadMyCards.loadCards();
  }
 
}

const eraseAll = () => {
  let divs = $('div');
  divs.children().remove();
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

let wait = () => {
  var t = $('<p></p>');
  var d = $('<div></div>');
  enemyCards.before(t);
  t.after(d);
  enemyCards.attr('style', 'display:none');
  d.attr('class', 'loader');
  d.before(t.text("Please wait for you enemy"));
  disabled = true;
  setTimeout(function(){
    t.remove();
    d.remove();
    enemyCards.removeAttr('style');
    disabled = false;
    loadEnemyCards.loadCards();
  }, 2000);
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

let showEnemyCards = () => {
  $('#enem1').removeAttr('src');
  $('#enem2').removeAttr('src');
  
  $('#enem1').attr('src', '../img/' + loadEnemyCards.numEnem1 + loadEnemyCards.suitEnem1 + '.png');
  $('#enem2').attr('src', '../img/' + loadEnemyCards.numEnem2 + loadEnemyCards.suitEnem2 + '.png');
}

let victory = () => {
  if(gameover) trigger();
  if (res!=0 && resEnem!=0 && !disabled && !gameover){
    let youWon = `You have ${res} points, and your enemy has ${resEnem} points! You won!`;
    let youLost = `You have ${res} points, and your enemy has ${resEnem} points! You lost!`;
    let mes = $('<p></p>');
    enemyCards.prepend(mes);
    showEnemyCards();
    if(res==21&&resEnem!=21)
      mes.text(youWon);
    else if (resEnem==21&&res!=21)
      mes.text(youLost);
    else if (res>resEnem) 
      mes.text(youWon);
    else if (res<resEnem) 
      mes.text(youLost);
    else if (res==resEnem)
      mes.text(`You both have ${res} points. Let's play again.`);
    res = resEnem = 0;
    gameover = true;
  }
}



let selection = () => {
  var mycard = document.querySelectorAll(".mycard");
  for(let i=0; i<mycard.length; i++){
    if(mycard[i]!=null) {
      mycard[i].addEventListener('click', change, true);
    }
  }
}

let change = (e) => {
  if(!disabled && !gameover){
    if(confirm("Would you like to change a card?")){
      eraseOne(e.target.id);
      if(e.target.id == '1') {
        loadMyCards.num1 = loadMyCards.loadFirstCard();
      } else if(e.target.id == '2'){
        loadMyCards.num2 = loadMyCards.loadSecondCard();
      }
      res = count(loadMyCards.num1, loadMyCards.num2);
      wait();
    }  
  }
}

$("#refresh").click(trigger);

$("#finish").click(victory);