let { $, sleep } = require('./funcs');

// Importing a standalone selenium webdriver
// since the selenium-cucumber-js module
// sadly only supports one...
const { Builder } = require('selenium-webdriver');

let sleepTime = 500;
//let raknareRed = -1;
let myArray = [];
let myNewArray = [];
let myArray2 = [];
let myNewArray2 = [];
let gamesolverDriver;
let u = 0; //räknar vinster för solvern yellow

let test = [];



function $$(cssSelector) {
  return $(cssSelector, gamesolverDriver);
}
//Tar reda på vad boten spelar i prototypen(röda) och return en siffra som kan användas för att flytta bricka i gamesolver
async function protoPlay() {

  let theBoard = await boardToArray();

  for (let i = 0; i < 42; i++) {
    if (theBoard[i] === 'red') {
      myArray.push(i);
    }
  }

  //console.log("board", myArray);
  myNewArray = [...new Set(myArray)]; //Tar bort dubbletter vilket rättar till arrayen
  //console.log("board", myNewArray);

  let perfectNumber;

  switch (myNewArray[myNewArray.length - 1]) {
    case 0: case 7: case 14: case 21: case 28: case 35:
      perfectNumber = 4;
      break;
    case 1: case 8: case 15: case 22: case 29: case 36:
      perfectNumber = 10;
      break;
    case 2: case 9: case 16: case 23: case 30: case 37:
      perfectNumber = 16;
      break;
    case 3: case 10: case 17: case 24: case 31: case 38:
      perfectNumber = 22;
      break;
    case 4: case 11: case 18: case 25: case 32: case 39:
      perfectNumber = 28;
      break;
    case 5: case 12: case 19: case 26: case 33: case 40:
      perfectNumber = 34;
      break;
    case 6: case 13: case 20: case 27: case 34: case 41:
      perfectNumber = 40;
      break;
    default:
      console.log('Somethings wrong');
  }

  return perfectNumber; //används i solver för att klicka vad boten gör
}


async function boardToArray() {
  let boardArray = [];
  let slots = await $('.slot'); // 42 slots
  let count = 0;
  for (let slot of slots) {
    let cssClass = await slot.getAttribute('class');
    let color = 'empty';
    if (cssClass.includes('red')) { color = 'red'; }
    if (cssClass.includes('yellow')) { color = 'yellow'; }
    boardArray.push(color);
  }
  return boardArray;
}

async function arrayFromSolver() {
  let solverSearchString = await gamesolverDriver.executeScript("return window.top.location.search");
  let solverBoard = await gamesolverDriver.executeScript("return window.top.board");
  //console.log('solverSearchString', solverSearchString);
  //console.log('solverBoard', solverBoard[3]);
  //let x = solverSearchString.slice(5,7)
  let last = solverSearchString.charAt(solverSearchString.length - 1);
  //console.log('solverSearchString',x);
  // let y = x.slice(0,1);
  //console.log('solverSearchString', last);
  let send = last - 1
  return send;
}


module.exports = function () {

  // Background

  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
  });

  this.When(/^I choose to play as a bot and a human$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn');
    let choiceArray = ['Bot', 'Människa'];
    for (let typeChoiceButton of typeChoiceButtons) {
      await typeChoiceButton.click();
      let currentChoice = choiceArray.shift();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for (let choice of choices) {
        let text = await choice.getText();
        if (text === currentChoice) {
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
      }
      await sleep(sleepTime * 2);
    }
  });

  this.When(/^with two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys('Our bot');
    await sleep(sleepTime * 2);
    await inputFields[1].sendKeys('Ms Perfect');
    await sleep(sleepTime * 2);
  });

  this.When(/^press the Börja spela\-button$/, async function () {
    let beginButton = await $('.begin-btn');
    beginButton.click();
    await sleep(sleepTime * 2);

  });

  this.Then(/^the game should start$/, async function () {
    let activeMenuLink = await $('.nav-link.active');
    let text = await activeMenuLink.getText();
    await sleep(1000); // small wait needed
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime * 2);
  });


  // After having done a small change in funcs.js
  // so that $ can use any driver - as a second argument
  // I write my own function $$ that can be used instead of writing
  // gamesolverDriver.findElements(By.css('selector'));


  this.Given(/^that we are on the gamesolver page$/, async function () {
    // creating a new driver
    gamesolverDriver = await new Builder().forBrowser('chrome').build();
    // loading the gamesolver page
    await gamesolverDriver.get('https://connect4.gamesolver.org/');

  });

  this.When(/^I choose to play as human and bot in the gamesolver$/, async function () {
    let player2Button = await $$('#player_2');
    await player2Button.click();
    await sleep(sleepTime * 5);
  });

  // Now we only have to write two different functions (or at least understand)
  // how to dectect which column that was played as the latest move in
  // 1) our app/the prototype
  // 2) the gamesolver/perfect app
  //
  // Then we can start to fake being a human but sending the other bots
  // move so the two bots can meet automatically
  //
  // Then can we test if the perfect bot always win



  this.When(/^two bots have played until someone wins$/, async function () {

    for (let i = 0; i < 42; i++) {
      let messageWin = await $$('#solution_header');
      let getmessageWin = await messageWin.getText();
      getmessageWin = getmessageWin.slice(7, 10);
      //console.log(getmessageWin);
      // driver.executeScript('console.log("round", ' + i + ')')
      // gamesolverDriver.executeScript('console.log("round", ' + i + ')')
      if (getmessageWin === 'won') {
        break;
      }

      await sleep(sleepTime * 2);
      let myNumber = await protoPlay(); //kallar på min protoPlay funktionen
      await sleep(sleepTime * 2);
      let newBoard = await $$('.board');
      await newBoard[myNumber].click();
      await sleep(sleepTime * 2);

      // await sleep(sleepTime * 4);
      //let solverNumber = await solverPlay(); //kallar på min solverPlay funktionen
      let solverBoard = await $('.slot');
      let solverNumber = await arrayFromSolver()
      await solverBoard[solverNumber].click();
      await sleep(sleepTime * 2);
      // myNumber = await protoPlay(); //kallar på min protoPlay funktionen
      // await sleep(sleepTime * 4);
      // await newBoard[myNumber].click();

     
    }

  });

  this.Then(/^the gamesolver bot should always win$/, async function () {

    let messageWin = await $$('#solution_header');
    let getmessageWin = await messageWin.getText();
    getmessageWin = getmessageWin.slice(0, 10);
    //console.log(getmessageWin);
    if (getmessageWin === 'Yellow won') {
      u++; //räknar vinster för Yellow
    }

    assert.equal(getmessageWin, 'Yellow won', 'Yellow player did not win')


  });

  this.Then(/^the games refreshed$/, async function () {
    let sleepTime = 500;
    myArray = [];
    myNewArray = [];
    myArray2 = [];
    myNewArray2 = [];
   // u = 0;
    test = [];
    

  });

  this.Then(/^I verify who is the best player$/, async function () {
    assert.equal(u, 3, 'The Bot player should win 3 times');
  });

}

