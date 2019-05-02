class GameInfo extends Component {

  constructor(game){
    super();
    this.game = game;
    this.addEvents({
      'click .again-btn': 'again'
    });
    App.playAgain = () => this.again();
  }

  again(){
    delete App.board;
    delete this.game.board;
    delete this.game.won;
    delete this.game.draw;
    this.game.render();
  }

  update(){
    this.render();
    this.game.helpers.resize(false);
  }

}