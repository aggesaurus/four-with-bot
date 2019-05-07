Feature: I want to verify if Dum bot is a worse player than Bot by playing the game
  Let them switch between red and yellow

Background:
  Given I have loaded the game-page
      
Scenario: Play the game between red Dum bot and yellow Bot  
When I choose red Dum bot and yellow as Bot
And I fill the name for both players
And I press play button to start the game
Then the two bots should play automatically
And a message should show who is is the winner


Scenario: Play the game between red Bot and yellow Dum bot
When I choose red Bot and yellow as Dum bot
And again I fill the name for both players
And again I press play button to start the game
Then again the two bots should play automatically
And again a message should show who is is the winner
And I verify who is the best player
    