# memegenerator

## Basic Frameworks and Tools

React: https://reactjs.org/

Create-React-App: https://github.com/facebook/create-react-app

React DevTools: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related

Material UI: https://mui.com/


## Potential Libraries

Compress Images: https://www.npmjs.com/package/compress-images

Text to speech: https://www.npmjs.com/package/text-to-speech-js

## How to start the server

To start the server in development mode on your local machine:

1. Create a free [mongoDB Atlas account](https://www.mongodb.com)
2. Create a .env file in the root directory
3. Put in place the following environment variables, according to [common .env syntax](https://www.npmjs.com/package/dotenv)
    a. MONGO_URI
    b. MONGO_USER
    c. MONGO_PW
    d. MONGO_DB
    e. PORT
    f. JWT_SECRET
    g. JWT_EXPIRE
4. Navigate to the `/backend` directory
5. Install npm packages, using the `npm install` command from the command line
6. Start the development server by running the `npm start` command

## Routes

There are a number of routes, which can be called to accomplish the creation, reading, updating and deletion (CRUD) of users, templates and memes, as well as the authentication of users and secure reset of forgotten passwords. The corresponding endpoints are as follows:

* /api/
    * user/
        * login
        * register
        * forgotpassword
        * resetpassword
    * template/
        * uploadSingle
        * retrieve
    * meme/
        * uploadSingle
        * retrieve

## Using the API

While the API can be called from the frontend, for testing-purposes we suggest using [Postman](https://www.postman.com), which can be downloaded and used for free. The testing of APIs running on localhost requires downloading the Postman Desktop Application.

