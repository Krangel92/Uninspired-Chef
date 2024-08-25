## Trello Board
https://trello.com/b/08mUmnLZ/uninspired-chef

## Diagrams
![image](https://github.com/user-attachments/assets/506d7886-5ead-49e9-9bcb-b87adac161cb)

![image](https://github.com/user-attachments/assets/6afad3ae-1f4b-4b3c-9aaf-2805496be467)

![image](https://github.com/user-attachments/assets/27687b0f-96c4-47d7-b2ec-4a173a08e145)

![image](https://github.com/user-attachments/assets/062f1cc3-a211-43e1-85e6-9c235cb52238)

![image](https://github.com/user-attachments/assets/ebd9fce6-c887-42f9-8588-54dc5acf05e3)







## Uninspired Chef Web app

**Problem**: The 'What am I going to cook?' dilemma we all face
**Solution**: Uninspired Chef – Your personal recipe generator
**How it works**: Enter your ingredients, get recipe ideas instantly

**Benefits**: 
Reduces food waste
No more last-minute grocery runs
Makes cooking easy and fun

**Our Mission**: To turn uninspired moments into culinary creativity

### Structure

This repo contains two applications:

- A frontend React App
- A backend api server

These two applications will communicate through HTTP requests, and need to be
run separately.

### Documentation

[More documentation of the codebase and its architecture can be found here.](./DOCUMENTATION.md)
It's recommended you all read the suggested docs _after making sure the whole
setup below worked for everyone_. Then work together on a diagram describing how
the application works.

### Card wall

REPLACE THIS TEXT WITH A LINK TO YOUR CARD WALL

### Quickstart

### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), (`20.5.0` at
   time of writing).
   ```
   nvm install 20
   ```

### Set up your project

1. Have one team member fork this repository
2. Rename the fork to `acebook-<team name>`
3. Every team member clone the fork to their local machine
4. Install dependencies for both the `frontend` and `api` applications:
   ```
   cd frontend
   npm install
   cd ../api
   npm install
   ```
5. Install an ESLint plugin for your editor, for example
   [ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
6. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   ```
   _Note:_ If you see a message that says
   `If you need to have mongodb-community@6.0 first in your PATH, run:`, follow
   the instruction. Restart your terminal after this.
7. Start MongoDB

   ```
   brew services start mongodb-community@6.0
   ```

### Setting up environment variables.

We need to create two `.env` files, one in the frontend and one in the api.

#### Frontend

Create a file `frontend/.env` with the following contents:

```
VITE_BACKEND_URL="http://localhost:3000"
```

#### Backend

Create a file `api/.env` with the following contents:

```
MONGODB_URL="mongodb://0.0.0.0/acebook"
NODE_ENV="development"
JWT_SECRET="secret"
```

For an explanation of these environment variables, see the documentation.

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npm run dev
```

You should now be able to open your browser and go to
`http://localhost:5174/signup` to create a new user.

Then, after signing up, you should be able to log in by going to
`http://localhost:5174/login`.

After logging in, you won't see much but you can create posts using PostMan and
they should then show up in the browser if you refresh the page.



Test for pull

