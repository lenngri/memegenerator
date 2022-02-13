# memegenerator

## Basic Frameworks and Tools

React: https://reactjs.org/

Create-React-App: https://github.com/facebook/create-react-app

React DevTools: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related

Material UI: https://mui.com/

Express: https://expressjs.com

Node: https://nodejs.dev

MongoDB: https://www.mongodb.com


## Backend

The backend is built using the [express-generator](https://expressjs.com/en/starter/generator.html) application tool. In addition we are using a number of further libraries, which you can find in the package.json file located in the backend directory.

### How to start the server

To start the server in development mode on your local machine:

1. Create a free [mongoDB Atlas account](https://www.mongodb.com)
2. Navigate to the `/backend` directory
3. Create a .env file in the `/backend` directory
4. Put in place the following environment variables, according to [common .env syntax](https://www.npmjs.com/package/dotenv)
    * MONGO_URI (*connection string allowing connection to MongoDB API*)
    * PORT (*port where you want to run the development server on localhost -- this must not be the same as the frontend*)
    * JWT_SECRET (*a string, which will be used to generate a secure connection token*)
    * JWT_EXPIRE (*expiration time of token in minute*)
5. Install npm packages, using the `npm install` command from the command line
6. Start the development server by running the `npm start` command

### Routes

There are a number of routes, which can be called to accomplish the creation, reading, updating and deletion (CRUD) of users, templates and memes, as well as the authentication of users. The corresponding endpoints are as follows:

* /api/
    * meme/
        * retrieve
        * uploadSingle
        * createSingle
        * createMany
        * update
    * meme/comment/
        * add
    * meme/vote/
        * update
    * user/
        * register
        * login
    * template/
        * retrieve
        * uploadSingle
    

### Using the API

While the API can be called from the frontend, for testing-purposes we suggest using [Postman](https://www.postman.com), which can be downloaded and used for free. The testing of APIs running on localhost requires downloading the Postman Desktop Application.

### Upcoming features

There are some features still in development. Most prominently, social login via the [Auth0 Service](https://auth0.com/), is almost ready to be shipped, but not yet running 100% stable.

## Frontend

The frontend was built using [create-react-app](https://create-react-app.dev) tool. It is written in JavaScript, using the react library. In addtion, a numbr of external libraries were used. These can be found in the package.json file, located in the frontend directory.

### How to start the frontend

To start the frontend in development mode on your local machine:

1. Navigate to the `/frontend` directory
2. Run `npm install`from the command line to install packages
3. Create a .env file `/frontend` directory
4. Put in place the following environment variables, according to [common .env syntax](https://www.npmjs.com/package/dotenv)
    * REACT_APP_BURL -- *full localhost address, where the development server is running*
5. Start the app by running `npm start`in the frontend directory

**FOR THE PURPOSE OF THIS HAND-IN WE HAVE PROVIDED A .ENV FILE WITH THE NECESSARY CREDENTIALS. IT IS AVAILABLE FOR DOWNLOAD IN THE BACKEND DIRECTORY ON THE GIT REPO**

## What the Application can do

### What the backend can do

#### Memes
[x] Retrieve single memes or many memes according to filters, such as template, creating user, date range or random
[x] Upload a single meme, which was generated in the frontend and save it to the DB, while saving the file to the directory structure
[x] Create a single meme with meta data received from the frontend, on the server and save it to the DB, while saving the file to the directory structure
[x] Create many memes from meta data received, save them to the db, while saving files to the server and return a list of URLs to access the created memes
[x] Update a single meme, which was previously saved and edited as a draft

#### Templates
[x] Retrieve single templates or many templates according to filters, such as creating user
[x] Upload single template and save to database and directory structure on server

#### Comments
[x] Add comments to memes, together with username

#### Votes
[x] Add and remove upvotes / downvotes to memes (limited to one per user)

#### Authentication
[x] Register new users while rejecting duplicate inputs. Password are being hashed with salt
[x] Login users securely, checking passwords against a secret
[x] Protect private routes by checking secure JWT tokens, both against our DB and social logins via Auth0 using hidden secrets

### What the Frontend can do







