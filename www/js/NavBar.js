class NavBar extends Component {

  constructor(){
    super();
    this.addEvents({
      'click a:contains(Avbryt)': 'cancelGame',
      'click a:contains(Spela igen)': 'cancelGame'
    });
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Spela', '/game'),
      new NavItem ('Teknisk dokumentation', '/documentation')
    ];
    this.gameStatus = 'Spela';
    setInterval(() => this.setGameStatus(), 100);
  }

  cancelGame(){
    App.playAgain();
  }

  setGameStatus(){
    let status = 'Spela';
    if(App.board){
      if(App.game && (App.game.won || App.game.draw)){
        status = 'Spela igen';
      }
      else {
        status = location.pathname === '/game' ? 'Avbryt spelet' : 'Tillbaka till spelet';
      }      
    }
    if(this.gameStatus !== status){
      this.gameStatus = status;
      let item = this.navItems.filter(x => x.url === '/game')[0];
      item.name = status;
      item.render();
      if(status === 'Avbryt spelet'){
        item.baseEl.find('a').addClass('active');
      }
    }
  }

}