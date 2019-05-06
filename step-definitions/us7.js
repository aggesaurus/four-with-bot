let { $, sleep } = require('./funcs');

let sleepTime = 500;

module.exports = function () {

    this.Given(/^I'm on the gamesolver\-page$/, async function () {

        sleepTime;
        await helpers.loadPage('https://connect4.gamesolver.org/');

    });

    this.When(/^the players play bricks with one move each$/, async function () {

        // NOTE: Only began this code, by playing one brick
        let bricksFilling = await $('.board');
        // clicking slots[0] is putting a coin in column 1
        // clicking slots[1] is putting a coin in column 2
        await bricksFilling[3].click();
        await sleep(sleepTime * 2);
        await bricksFilling[4].click();
        await sleep(sleepTime * 10);

        // MORE TO WRITE HERE!
    });

    this.When(/^one of the player clicks the back button$/, async function () {

        let backPress = await $('.button');  //This is for class
        await backPress[2].click();          //the back button array position at 2nd place after about[0] & new[1] button
        await sleep(sleepTime * 3);

      });

      this.Then(/^the last brick he\/she puts was taken back$/, async function () {
        
        let showMove = await $('#solution_header');    //This if for id
        let text = await showMove.getText();
        assert.equal(text, 'Red can win in 21 moves', 'You have not press back button'); 
      });

}