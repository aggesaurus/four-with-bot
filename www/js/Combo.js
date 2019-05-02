class Combo {

  constructor(slots){
    this.slots = slots;
    for(let slot of slots){
      slot.inCombos.push(this);
    }
  }

  countColor(color){
    return this.slots.filter(x => x.color === color).length;
  }

  won(color, markWin = true){
    let won = this.countColor(color) === 4;
    if(won && markWin){
      this.slots.forEach(slot => slot.markWin());
    }
    return won;
  }

  full(){
    return this.slots.filter(x => x.color).length === 4;
  }

  score(color, offset = 0){
    if(this.countColor('red') > 0 && this.countColor('yellow') > 0){
      return 0;
    }
    return 10 ** (2 * (offset + this.countColor(color)));
  }

}