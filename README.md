# Conundrum
An interactive platform for posting and solving riddles. Created with React, MongoDB, Express and Node.js.

[conundrum.netlify.app](https://conundrum.netlify.app)

![Screenshot of Habitory](https://i.imgur.com/0qOc6R3.png)


## Installation & usage
### Installation
- Clone or download the repo.
- In your command line, run `npm install` then `npm start` in both the client and server folders.
- If it doesn't automatically open, navigate to `http://localhost:3000` in your browser

### Usage
- Click **Register** to create an account
- Click **Login** to login using the above username and password.
- To submit a new riddle, type it into the form and press **Submit**.
- Press the like and comment buttons on each post to interact.
- Delete your posts or comments with the red delete button.
- Switch to dark or light mode by pressing **Switch theme** in the menubar.

## Technologies
- React
- Apollo
- GraphQL
- MongoDB and Mongoose
- Node.js

## Process
- Started by wireframing the pages in Figma
- Wrote pseudo code to break down the logic of collecting user input, collecting and sending information to/from the database, linking to the server and assigning functionality to buttons.
- Created a database with a user model and a posts model.
- Compartmentalised client functionality into separate components for clarity.

## Challenges
- Implementing login authentication
- Differentiating between logged in/out state
- Accessing the cache to view submitted posts instantly

## Future features
- Email or on-site notifications
- User profiles
- Gamification (scores, a leaderboard with friends)

## License
- [MIT License](https://opensource.org/licenses/mit-license.php)
