class Slot extends Component {

  constructor(board, row, col){
    super();
    this.board = board;
    this.row = row;
    this.col = col;
    this.color = '';
    this.inCombos = [];
    this.addEvents({
      'click div': 'click',
      'mouseenter > div': 'mouseenter',
      'mouseleave > div': 'mouseleave'
    });
  }

  click(){
    this.board.makeMove(this.col);
    console.log(this.cl)
  }

  mouseenter(mark = true){
    for(let row of this.board.matrix){
      row[this.col].marked = mark;
      row[this.col].baseEl[mark ? 'addClass' : 'removeClass']('marked');
    }
  }

  mouseleave(){
    this.mouseenter(false);
  }

  markWin(){
    this.baseEl.addClass('won');
  }

}