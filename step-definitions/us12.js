let { $, sleep } = require('./funcs');

let sleepTime = 500;
let x = 0;
//let i = 0;
let u = 0;
let SlotsArray = [];
let myArray = [];

let yellowArray = [];



module.exports = function () {

    async function forSlots(coins) {
        try {
            let slots = await $('.board')
            await slots[coins].click()
            await sleep(sleepTime * 5)

        } catch (e) {
            console.log(e)
        }
    }



    this.Given(/^I am on the Connect four solver game\-page$/, async function () {
        await helpers.loadPage('https://connect4.gamesolver.org/');
        await sleep(500 * 2);

    });


    this.When(/^I choose red human and yellow auto$/, async function () {
        await sleep;
        let autoYellow = await $('#player_2');
        await autoYellow.click();
        await sleep(500 * 2);

    });


    this.When(/^I start to play as red$/, async function () {
        await sleep;
        //SlotsArray = SlotsArray = [3, 10, 14, 16, 20]
        SlotsArray = SlotsArray = [3, 16]
        for (i = 0; i < SlotsArray.length; i++) {
            await forSlots(SlotsArray[i]);
            await sleep(500 * 4);
        }

    });


    this.Then(/^the two players should play on each turn$/, async function () {

        async function boardToArray() {
            let boardArray = [];
            let slots = await $('.board'); // 42 slots
            let count = 0;
            for (let slot of slots) {
                let cssClass = await slot.getAttribute('class');
                let color = 'none';
                if (cssClass.includes('player2')) { color = 'player2'; }
                boardArray.push(color);
            }
            return boardArray;
        }

        let theBoard = await boardToArray();

        for (let y = 0; y < 42; y++) {
            if (theBoard[y] === 'player2') {

                yellowArray.push(y);
            }
        }

    });


    this.Then(/^I verify that the yellow auto player is not playing identically$/, async function () {

        if (yellowArray[1] === 20) {
            u++;
        }
        yellowArray = [];

        //console.log('Hur många gånger spelade gul värdet 20 som andra bricka ?:',u +' gånger');
        assert.equal(u, '6', 'The yellow bot did not play his piece on the second turn identically six times');

    });


}