let { $, sleep } = require('./funcs');

let sleepTime = 500;
let SlotsArray=[];



module.exports = function () {

  async function forSlots(coins){
    try{
      let slots=await $('.slot')
      await slots[coins].click()
      await sleep (250)
  
    } catch (e){
      console.log(e)
    }
    
  
  }

  // Background

  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
  });

  this.When(/^I choose to play as two human players$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn');
    for (let typeChoiceButton of typeChoiceButtons) {
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for (let choice of choices) {
        let text = await choice.getText();
        if (text === 'Människa') {
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
    await inputFields[0].sendKeys('HumanP1');
    await sleep(sleepTime * 2);
    await inputFields[1].sendKeys('HumanP2');
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

  

  this.When(/^the first player plays (\d+) bricks in a row horizontally$/, async function (fillBrick) {
  SlotsArray = SlotsArray=[0,6,1,5,2,4,3]
    for( i=0; i< SlotsArray.length; i++){
      await forSlots(SlotsArray[i]);
     
    }

  });

  this.Then(/^he\/she should win$/, async function(){
    await sleep(sleepTime * 2);
    let messageWin = await driver.findElement(by.css('.game-info h3'));
    let getmessageWin = await messageWin.getText();
    getmessageWin = getmessageWin.slice(3,13);
    await sleep(sleepTime * 2);
    if (getmessageWin === 'HumanP1 vann')
    assert.equal(getmessageWin, 'HumanP1 vann', 'The red play should win');
    await sleep(sleepTime * 2);

  });

  

  this.When(/^the first player plays (\d+) bricks in a row vertical$/, async function (fillBrick) {
    SlotsArray = SlotsArray=[0,6,0,6,0,6,0,6]
    for( i=0; i< SlotsArray.length; i++){
      await forSlots(SlotsArray[i]);
     
    }
  
  });



  //scenario 3

  this.When(/^the first player plays (\d+) bricks in a diagonally \(left to right\)$/, async function (hola) {
    let slots = await $('.slot');
    SlotsArray = SlotsArray=[0,1,1,2,2,3,2,3,2,1,3,6,3]
    for( i=0; i< SlotsArray.length; i++){
      await forSlots(SlotsArray[i]);
     
    }


  });

  this.Then(/^he\/she is gonna be a winner$/, async function () {
    await sleep(sleepTime * 2);
    let messageWin = await driver.findElement(by.css('.game-info h3'));
    let getmessageWin = await messageWin.getText();
    getmessageWin = getmessageWin.slice(3,13);
    await sleep(sleepTime * 2);
    if (getmessageWin === 'HumanP1 vann')
    assert.equal(getmessageWin, 'HumanP1 vann', 'The red play should win');
    await sleep(sleepTime * 2);

  });

  this.When(/^the first player plays (\d+) bricks in a diagonally \(right to left\)$/, async function (hola) {
    let slots = await $('.slot');
    SlotsArray = SlotsArray=[6,5,5,4,4,3,4,3,4,5,3,6,3]
    for( i=0; i< SlotsArray.length; i++){
      await forSlots(SlotsArray[i]);
     
    }
  });

//Raden är bortkommenterad   
/*  this.Then(/^he\/she is gonna be a winner$/, async function () {
    await sleep(sleepTime * 2);
    let messageWin = await driver.findElement(by.css('body > div > main > div > div:nth-of-type(1) > h3 > span'));
    let getmessageWin = await messageWin.getText();
    await sleep(sleepTime * 2);
    assert.equal(getmessageWin, 'HumanP1 vann, efter 6 drag!', 'The red play should win');
    await sleep(sleepTime * 2);
  });*/


}
