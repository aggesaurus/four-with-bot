Feature: Start the game As a user I would like to start the game by filling in all the information as red player and yellow player

Scenario: filling in the information
    Given that I am on the game-page
    When I choose to play as red human and yellow bot
    And enter two different names
    And I press the 'Börja spela' button
    Then the game should start

