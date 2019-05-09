Feature: Able to cancel the on going game
Background: filling in the information when start a new game
    Given that I am on the game-page
    When I choose to play as red human and yellow bot
    And enter two different names
    And I get two different avatars
    And I press the 'Börja spela' button
    Then the game should start

Scenario: cancel the on going game
    When the both players play fyra i rad
    And the red human player clicks the 'Avbryt spelet' button
    Then the game should stop




  
