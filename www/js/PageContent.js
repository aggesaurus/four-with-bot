class PageContent extends Component {

  constructor(){
    super();
    this.startPage = new StartPage();
    this.game = new Game();
    this.missingPage = new MissingPage();
    this.documenter = new Documenter();
  }

}