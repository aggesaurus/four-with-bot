class Player extends Component {
  
  constructor(game, color, type = 'Människa'){
    super();
    this.game = game;
    this.color = color;
    this.type = type;
    this.name = '';
    this.avatar = type === 'Människa' ? '👧🏼' : '👽';
    this.avatarChoices = {
      'Människa': ['👧🏼', '👦🏽', '👩🏻', '👨🏼', '👵🏼', '👴🏻'],
      'Bot': ['👽', '🤖', '👾', '💩', '👻', '🎰'],
      'Dum bot': ['👽', '🤖', '👾', '💩', '👻', '🎰'],
    };
    this.addEvents({
      'click .type-choice div': 'typeChoice',
      'click .avatar-choice div': 'avatarChoice',
      'keyup input': 'nameChoice'
    });
  }

  typeChoice(e){
    let aList = this.avatarChoices[this.type];
    let aIndex = aList.indexOf(this.avatar);
    this.type = $(e.target).text();
    aList = this.avatarChoices[this.type];
    this.avatar = aList[aIndex];
    this.render();
  }

  avatarChoice(e){
    this.avatar = $(e.target).text();
    this.render();
  }

  nameChoice(e){
    this.name = $(e.target).val();
    this.game.disableEnableBeginButton();
    if(e.which === 13 && this.game.enabledBeginButton){
      this.game.begin();
    }
  }

}