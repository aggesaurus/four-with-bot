let {$, sleep} = require('./funcs');

let sleepTime = 500;

module.exports = function(){

    let x = 0; //Variabel som används som räknare till action: 'I choose to play as red human and yellow bot'

    this.Given(/^that I am on the game\-page$/, async function () {
        await sleep(sleepTime);
        await helpers.loadPage('http://localhost:3000/game');
      });

      this.When(/^I choose to play as red human and yellow bot$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn' );
    for(let typeChoiceButton of typeChoiceButtons){
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for(let choice of choices){
        let text = await choice.getText();

       if(x===0)
       {
            if(text === 'Människa'){
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
      await sleep(sleepTime * 2);
    }
      });


      this.When(/^enter two different names$/, async function () {
        await sleep(sleepTime * 2);
        //await driver.findElement(By.css('body > div > main > div > div:nth-child(3) > div > input')).sendKeys("HumanP1");
        //await driver.findElement(By.css('body > div > main > div > div:nth-child(4) > div > input')).sendKeys("BootP1");
        //await sleep(2000);    
        let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
        await inputFields[0].sendKeys('HumanP1');
        await sleep(sleepTime * 2);
        await inputFields[1].sendKeys('BootP1');
        await sleep(sleepTime * 2);
      });

      this.When(/^I press the 'Börja spela' button$/, async function () {
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

}

