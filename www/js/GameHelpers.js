class GameHelpers {

  constructor(game){
    this.game = game;
    $(window).resize(() => this.resize());
    this.resize();
    this.newTurn();
  }

  resize(winCheck = true){
    let board = App.board;
    if(!board || !board.baseEl.length){ 
      setTimeout(() => this.resize(), 100);
      return;
    }
    winCheck && App.board.winChecker.check();
    board.baseEl.hide();
    let width = Math.min($('main').width(), $('main').height());
    width -= (this.game.won || this.game.draw) && $('main').height() - width < 100 ? 100 : 0;
    board.baseEl.width(width).show().addClass('shown');
  }

  newTurn(){
    if(!App.board || !App.board.baseEl.length){ 
      setTimeout(() => this.newTurn(), 100);
      return;
    }
    this.game.moveNo = Math.floor(
      1 + App.board.matrix.flat().filter(x => x.color).length / 2
    );
    this.game.currentPlayer = this.game.players[
      App.board.currentColor === 'red' ? 0 : 1
    ];
    this.game.info.render();
    $('body').addClass('human-move');
    if(this.game.botColors.includes(App.board.currentColor)){
      $('body').removeClass('human-move');
      let move = this.game.dumbBotColors.includes(App.board.currentColor) ?
        this.game.bot.decideDumbMove() :
        this.game.bot.decideMove(App.board.currentColor);
      setTimeout(() => App.board.makeMove(move, true), 500 + Math.random() * 1000);
    }
  }

}