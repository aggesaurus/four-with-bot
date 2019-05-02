class StartPage extends Component {

  constructor(){
    super();
    this.addRoute('/', 'Start');
    this.mountCount = 0;
  }

  mount(){
    this.mountCount++;
    this.render();
  }

}