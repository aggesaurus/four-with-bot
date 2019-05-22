Feature: I want to verify that the Bot is not playing identically on each turn in prototype game

Scenario: Play the game between red Human and yellow Bot 
Given I am on the four-in-a-row gamepage
When I choose red Human and yellow as Bot and fill in their names
And I click the startbutton
Then the two players should play
And I verify that the Bot is not playing identically