let {$, sleep} = require('./funcs');

let sleepTime = 500;
let x = 0;
let i = 0;
let SlotsArray=[];
let myArray=[];

let yellowArray = [];



module.exports = function(){


    async function forSlots(coins){
        try{
          let slots=await $('.slot')
          await slots[coins].click()
          await sleep (sleepTime*5)
      
        } catch (e){
          console.log(e)
        }
        
      
      }

    this.Given(/^I am on the four\-in\-a\-row gamepage$/,async function () {
       await helpers.loadPage('http://localhost:3000/game');
       await sleep(500 * 2);
                 
               });


     this.When(/^I choose red Human and yellow as Bot and fill in their names$/,async  function () {
        await sleep(500 * 2);
        let typeButtons = await $('.type-choice-btn' );
        for(let typeButton of typeButtons){
          await typeButton.click();
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
          await sleep(500 * 2);
        }

        await sleep(500 * 2);
       let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
       await inputFields[0].sendKeys('Human1');
       await sleep(500 * 2);
       await inputFields[1].sendKeys('Bot2');
       await sleep(500 * 2);
          });
          

    this.When(/^I click the startbutton$/,async function () {
            x=0;
            let clickButton = await $('.begin-btn');
            clickButton.click();
            await sleep(sleepTime*2);
          });

    this.Then(/^the two players should play$/,async function () {

        SlotsArray = SlotsArray=[3,3]
        for( i=0; i< SlotsArray.length; i++){
          await forSlots(SlotsArray[i]);
        }
            
          });
            
    this.Then(/^I verify that the Bot is not playing identically$/, async function () {
        async function boardToArray() {
            let boardArray = [];
            let slots = await $('.slot'); // 42 slots
            let count = 0;
            for (let slot of slots) {
                let cssClass = await slot.getAttribute('class');
                let color = 'empty';
                if (cssClass.includes('yellow')) { color = 'yellow'; }
                boardArray.push(color);
            }
            return boardArray;
        }

        let theBoard = await boardToArray();

        for (let y = 0; y < 42; y++) {
            if (theBoard[y] === 'yellow') {
                
               
               
               let lastValue = yellowArray.push(y);
               // yellowArray = yellowArray.push(y);
               // console.log(lastValue);
                //console.log(yellowArray);
                yellowArray = [...new Set(yellowArray)]; //Tar bort dubbletter vilket rättar till arrayen
                //console.log(yellowArray);
            }
            
        }
        //console.log(yellowArray[1]);
        assert.equal(yellowArray[1], '37', 'Yellow Bot did not place the brick identically');
        yellowArray = [];
          });

}