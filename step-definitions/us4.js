let {$, sleep} = require('./funcs');

module.exports = function(){
   let x = 0;
   let i = 0;

   let sleepTime = 500;
 

   this.Given(/^I have loaded the game\-page$/, async function () {
       await sleep(500);
       await helpers.loadPage('http://localhost:3000/game');
     });


     this.When(/^I choose red Dum bot and yellow as Bot$/, async function () {
        let typeButtons = await $('.type-choice-btn' );
   for(let typeButton of typeButtons){
     await typeButton.click();
     let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
     for(let choice of choices){
       let text = await choice.getText();

      if(x===0)
      {
           if(text === 'Dum bot'){
                x++;
               await choice.click();
               break;
         }
      }

      if(x===1)
      {
           if(text === 'Bot'){
               x++;
               await choice.click();
               break;
           }
      }

     }
     await sleep(500 * 2);
   }
     });
     this.When(/^I fill the name for both players$/, async function () {
         x=0;
       await sleep(500 * 2);
       let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
       await inputFields[0].sendKeys('StupidBot1');
       await sleep(500 * 2);
       await inputFields[1].sendKeys('BotP1');
       await sleep(500 * 2);
     });
      {
     this.When(/^I press play button to start the game$/, async function () {        
      let clickButton = await $('.begin-btn');
      clickButton.click();
      await sleep(14000);
    });
    
      this.Then(/^the two bots should play automatically$/, async function ()
      {
        await sleep(14000);
       });

       this.Then(/^a message should show who is is the winner$/, async function () {
        await sleep(sleepTime * 2);
        let messageWin = await driver.findElement(by.css('body > div > main > div > div:nth-of-type(1) > h3 > span'));
        let getmessageWin = await messageWin.getText();
        getmessageWin = getmessageWin.slice(0,10);
        
        if (getmessageWin === 'BotP1 vann'){
          i++; //räknar vinster för BotP1
        }
        //console.log(i);
        await sleep(sleepTime * 2);
        assert.equal(getmessageWin, 'BotP1 vann', 'The yellow BotP1 should win');
        await sleep(sleepTime * 2);
      });

      this.Then(/^I verify who is the best player$/, async function () {
        assert.equal(i, 5, 'The Bot player should win 5 times');
      });

    }
}