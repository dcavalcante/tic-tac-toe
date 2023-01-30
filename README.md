# Tic-Tac-Toe

This is a Tic-Tac-Toe game implemented using React `useEffect` to keep track of turns. The second player (O) can be another human or an AI with different algorithms chosen from a select.

## Features

* User can play against another human or an AI opponent
* Includes 3 different AI algorithms: Random, Minimax and Minimax AB Pruning
* Checks with `useEffect` for win or draw and best move for AI.

## Setup

* Clone the repository
* Run `npm install` to install the dependencies
* Run `npm start` to start the development server
* Run `npm test` to test with React Testing Library
* Open http://localhost:3000 in a web browser to play the game

## Code Structure

The code for the game is located in the src directory. Main component is located in src/App.js and helper functions with AI algorithms are located in src/utils.js

## Improvements

### General
* UI improvements: Add animations and visuals for placing a piece, winning and losing, etc.
* Accessibility: Make it as easy as possibily to be played on a screen reader and add keyboard navigation.
* Suggest next move / preview AI next move
* Show the user the current decision tree of selected algorithm (if applicable)

### On utils.js:
1. Implement `monteCarlo` and `monteCarloTreeSearch`
2. Remove hardcoded `'X'` and `'O'` strings from `minimaxBetter` and `minimaxAlphaBeta`

### On App.js:
1. Implement `<PlayerSelect />` to allow changing player/adversary strings (needs #3 above)

## Known bugs

None (so far...)