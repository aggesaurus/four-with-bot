Feature: I want to verify if Dum bot is a worse player than Bot by playing the game ten times

scenario: Play the game between red Dum bot and yellow Bot

    Given I have loaded the game-page
    When I choose red Dum bot and yellow as Boot
    And I fill the name for both players
    And I press play button to start the game
    Then the two bots should play automatically
    And get a message should show whose is the winner
    And I verify whose is the best player 