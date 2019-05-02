class App extends Component {

  constructor(){
    super();
    App.instance = this;
    this.navBar = new NavBar();
    this.pageContent = new PageContent();
    this.footer = new Footer();
    // only in the App class:
    new Router(this.pageContent);
    $('body').html(this.render());
  }

  static sleep(ms){
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }

}