class Board extends Component {

  constructor(game){
    super();
    this.matrix = [];
    this.game = game;
    this.buildMatrix();
    this.winChecker = new WinChecker(this.matrix);
    this.currentColor = 'red';
  }

  buildMatrix(){
    for(let row = 0; row < 6; row++){
      let rowArr = [];
      for(let col = 0; col < 7; col++){
        rowArr.push(new Slot(this, row, col));
      }
      this.matrix.push(rowArr);
    }
  }

  async makeMove(col, moveFromBot = false){
    let clickBlock =  !moveFromBot && this.game.botColors.includes(this.currentColor);
    if(this.moveForbidden ||  clickBlock){ return; }
    this.moveForbidden = true;
    let lastSlot, moveDone;
    for(let row = 0; row < 6; row++){
      let slot = this.matrix[row][col];
      if(!slot.color){
        moveDone = true;
        if(lastSlot){
          lastSlot.color = '';
          lastSlot.render();
        }
        slot.color = this.currentColor;
        slot.render();
        await App.sleep(40);
      }
      lastSlot = slot;
    }
    if(moveDone){
      if(this.winChecker.check()){ return; }
      this.currentColor = this.currentColor === 'red' ? 'yellow' : 'red';
      this.game.helpers.newTurn();
    }
    this.moveForbidden = false;
  }

}