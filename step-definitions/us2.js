let { $, sleep } = require('./funcs');

let sleepTime = 500;

//let roleChoices;

let blueRobot;

module.exports = function () {
  //let x = 0;
  this.Given(/^I am on the game\-page$/, async function () {
    await sleep(sleepTime);
    await helpers.loadPage('http://localhost:3000/game');
  });

  this.When(/^I choose an avatar for the red player$/, async function () {
    let typeChoiceButton = await $('.avatar-choice-btn');
    await typeChoiceButton[0].click();
    manBlack = await driver.findElement(By.css('body > div > main > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > span'));
    await manBlack.click();
    await sleep(5000);

  });

  this.When(/^I choose another avatar for the yellow player$/, async function () {
    let typeChoiceButton2 = await $('.avatar-choice-btn');
    await typeChoiceButton2[1].click();
    blueRobot = await driver.findElement(By.css('body > div > main > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > span'));
    await blueRobot.click();
    await sleep(3000);
  });

  this.Then(/^the two avatars are chosen$/, async function () {

    let iconChoices = await $('.avatar-choice-btn');
    let text = await iconChoices[0].getText();
    assert.equal(text, '👦🏽', 'Wrong chosen of avatar')
    await sleep(2000);

  });

}








//let roleChoices = await $('.type-choice-btn');
    //let text = await roleChoices[0].getText();
   // let text = await roleChoices[1].getText();

   // assert.equal(text, "Människa", 'Wrong chosen of avatar')
   // assert.equal(text, "Bot", 'Wrong chosen of avatar')
