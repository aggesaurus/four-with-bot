class Bot {

  decideDumbMove(){
    let col;
    while(!this.freeRow(col)){ col = Math.floor(Math.random() * 7); }
    return col;
  }

  decideMove(color){
    let moves = [];
    for(let col = 0; col < 7; col++){
      moves.push({col: col, score: this.evaluateMove(col, color)});
    }
    moves.sort((a,b) => b.score - a.score);
    moves = moves.filter(x => x.score !== false);
    if(moves.length < 1){ return false; }
    moves = moves.filter(x => x.score === moves[0].score);
    return moves[Math.floor(Math.random() * moves.length)].col;
  }

  evaluateMove(col, color){
    let opponentColor = color === 'red' ? 'yellow' : 'red';
    let m = App.board.matrix, score = 0, row = this.freeRow(col);
    if(row === false){ return false; }
    for(let combo of m[row][col].inCombos){
      m[row][col].color = opponentColor;
      let oScore = combo.score(opponentColor, 1);
      score += oScore > 10 ** (2 * 3) ? oScore : 0;
      m[row][col].color = color;
      score += combo.score(color);
      if(combo.score(color) >= 10 ** (2 * 4)){ score = 10 ** 11; }
    }
    for(let i = 0; i < 7; i++){
      let r = this.freeRow(i);
      if(r === false){ continue; }
      m[r][i].color = opponentColor;
      score -= App.board.winChecker.check(false) === opponentColor ? 10 ** 10 : 0;
      m[r][i].color = '';
    }
    m[row][col].color = '';
    return score + Math.abs(3 - col);
  }

  freeRow(col){
    return (App.board.matrix.flat().reverse()
      .filter(x => !x.color && x.col === col)[0] || {row: false}).row;
  }

}