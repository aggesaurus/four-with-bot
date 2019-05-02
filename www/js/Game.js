class Game extends Component {

  constructor(){
    super();
    this.addRoute('/game', 'Spela');
    this.addEvents({
      'click .begin-btn': 'begin',
      'click .reset-btn': 'createPlayers'
    });
    this.createPlayers();
    this.bot = new Bot();
    this.info = new GameInfo(this);
    App.game = this;
  }

  createPlayers(){
    this.players = [
      new Player(this, 'red'), 
      new Player(this, 'yellow', 'Bot')
    ];
    this.render();
  }

  begin(){
    this.helpers = new GameHelpers(this);
    this.botColors = [];
    this.dumbBotColors = [];
    for(let player of this.players){
      player.type !== 'Människa' && this.botColors.push(player.color);
      player.type === 'Dum bot' && this.dumbBotColors.push(player.color);
    }
    this.board = new Board(this);
    App.board = this.board;
    this.render();
    this.helpers.resize();
  }

  disableEnableBeginButton(){
    this.enabledBeginButton = 
      this.players[0].name.length > 1 && this.players[1].name.length > 1;
    $('.begin-btn').prop( "disabled",  !this.enabledBeginButton);
  }
  
  unmount(){
    if(!this.board){ return; }
    setTimeout(() => this.helpers.resize(), 0);
  }

}