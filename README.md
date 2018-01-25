# Joust

## Running Joust
Go to the project folder and run `ionic serve` or `ionic cordova run browser` if you need to develop with any pages that require
the use of the accelerometer.

## Running the server
Go to the server folder and run `npm install` (if it's the first time running the server) and then run `node index.js`

## Developing
The bulk of the functionality is in `/src/pages`. 
* about - about page (currently unused)
* contact - contact page (not sure if needed)
* game - stores socket.io example code, it'll be deleted once `game-joined` and `game-hosted` are working
* game-hosted - handles a user that is hosting a game. It'll handle game play for that user and coordinate starting/ending a game by broadcasting to the server
* game-joined - handles a user that is joining a game. Similar to `game-hosted` but without the ability to manage the game
* game-menu - provides links to host/join a game
* host-game - allows a user to create a game, and sets a game 'room' up on the server
* join-game - allows a user to join a game
* tabs - handles the tabs at the bottom of the screen (probably won't be used once a more 'game' like navigation is used)