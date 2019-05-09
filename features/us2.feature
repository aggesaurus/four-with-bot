Feature: Able to pick out avatars
Scenario: I choose both avatars
    Given I am on the game-page
    When I choose an avatar for the red player
    And I choose another avatar for the yellow player
    Then the two avatars are chosen
    
