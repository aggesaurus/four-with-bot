Feature: back to the previous step (on Connect 4 Solver game)
as a user I can go back to the previous step on on going game

Scenario: cancel my move
    Given I'm on the gamesolver-page
    When the players play bricks with one move each
    And one of the player clicks the back button
    Then the last brick he/she puts was taken back 

