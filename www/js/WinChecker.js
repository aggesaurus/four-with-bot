class WinChecker {

  constructor(matrix){
    this.combos = [];
    this.createCombos(matrix);
  }

  createCombos(m){
    for(let row = 0; row < 6; row++){
      for(let col = 0; col < 7; col++){
        let c = [[], [], [], []];
        for(let i = 0; i < 4; i++){
          c[0].push(m[row][col + i]);
          c[1].push(m[row + i] ? m[row + i][col] : undefined);
          c[2].push(m[row + i] ? m[row + i][col + i] : undefined);
          c[3].push(m[row - i] ? m[row - i][col + i] : undefined);
        }
        this.combos = this.combos.concat(c);
      }
    }
    this.combos = this.combos
      .filter(x => !x.includes(undefined))
      .map(x => new Combo(x));
  }

  check(markWin = true){
    let  allFull = true, game = markWin ? App.game : {
      info: {update(){}}, players: []
    };
    for(let combo of this.combos){
      for(let color of ['red', 'yellow']){
        if(combo.won(color, markWin)){
          game.won = game.players[color === 'red' ? 0 : 1];
          $('body').removeClass('human-move');
          game.info.update();
          return color;
        }
      }
      allFull = allFull && combo.full();
    }
    if(allFull){ 
      game.draw = true;
      game.info.update();
      return 'draw';
    }
    return false;
  }

}