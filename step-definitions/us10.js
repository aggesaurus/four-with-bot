let {$, sleep} = require('./funcs');

let sleepTime = 500;

module.exports = function(){
 
  // Background

  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
  });
  
  this.When(/^I choose to play as two human players$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn' );
    for(let typeChoiceButton of typeChoiceButtons){
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for(let choice of choices){
        let text = await choice.getText();
        if(text === 'Människa'){
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

  // Scenarios

  this.When(/^the first player plays (\d+) bricks in a row horizontally$/, async function (fillBrick) {

    let slots = await $('.slot'); 
    await slots[0].click();
    await sleep(sleepTime * 2);
    await slots[6].click();
    await sleep(sleepTime*2);
    await slots[1].click();
    await sleep(sleepTime * 2);
    await slots[5].click();
    await sleep(sleepTime * 2);
    await slots[2].click();
    await sleep(sleepTime * 2);
    await slots[4].click();
    await sleep(sleepTime * 2);
    await slots[3].click();
    await sleep(sleepTime * 10);
    
    // MORE TO WRITE HERE!

  });

  this.Then(/^he\/she should win$/,async function () {
    await sleep(sleepTime * 2);
    let messageWin = await driver.findElement(by.css('body > div > main > div > div:nth-of-type(1) > h3 > span'));
    let getmessageWin = await messageWin.getText();
    await sleep(sleepTime * 2);
    assert.equal(getmessageWin, 'HumanP1 vann, efter 4 drag!', 'The red play should win');
    await sleep(sleepTime * 2);
 
    //body > div > main > div > div.game-info > h3 > span
  });

}