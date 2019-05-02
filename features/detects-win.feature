Feature: Detect win
  As user I would like the app to detect all ways of winning (horizantal, vertical, diagonal in two directions).

Background:
  Given that I goto the game page
  When I choose to play as two human players
  And with two different names
  And press the Börja spela-button
  Then the game should start

Scenario: Horizontal win
  When the first player plays 4 bricks in a row horizontally
  Then he/she should win

#Scenario: Vertical win
#  When the first player plays 4 bricks in a row vertical
#  Then he/she should win

#Scenario: Diagonal win (left to right)
#  When the first player plays 4 bricks in a diagonally (left to right)
#  Then he/she should win

#Scenario: Diagonal win (right to left)
#  When the first player plays 4 bricks in a diagonally (right to left)
#  Then he/she should win