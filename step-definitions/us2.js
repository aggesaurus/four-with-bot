let { $, sleep } = require('./funcs');

let sleepTime = 500;

//let roleChoices;

let blueRobot;

module.exports = function () {
  let x = 0;
  this.Given(/^I am on the game\-page$/, async function () {
    await sleep(sleepTime);
    await helpers.loadPage('http://localhost:3000/game');
  });

  this.When(/^I choose two different avatars for both players$/, async function () {
    let avatarChoiceButtons = await $('.avatar-choice-btn');
    for(let avatarChoiceButton of avatarChoiceButtons){
      await avatarChoiceButton.click();
      let avatarChoices = await $('.dropdown-menu.avatar-choice.show .dropdown-item');
      for(let avatarChoice of avatarChoices){
        let avatar = await avatarChoice.getText();

       if(x===0)
       {
            if(avatar === '👦🏽'){
                 x++;
                await avatarChoice.click();
                break;  
          }
       }

       if(x===1)
       {
            if(avatar === '👾'){
                x++;
                await avatarChoice.click();
                break;  
            }
       }          

      }
      await sleep(sleepTime * 2);
    }

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
