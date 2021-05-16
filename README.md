# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## What You're Getting
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   ├── images folfer # the images of users
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains Routes, and the default route redirects to home page.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── _DATA.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── common # files which could be used in different apps.
        ├── not-found.js # The default page for not found urls
    │   └── PrivateRoute # the component which redirect user if unauthenticated
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
└── components
    ├── answer-question.js # displays the details of unanswered question and allow the logged-in user to answer it
    ├── app-header.js # The navbar
    ├── home.js # This is the file which contains all exports of the compenent of this folder, to reduce the import statement rows
    ├── leaderboard.js # leaderboard contains the following the user’s name, the user’s picture, the number of questions the user   asked; and the number of questions the user answered.
    ├── login # allow user to select one of users 
    ├── new-question # allow user to create new question
    ├── question-list # the component of each tab in home to display list of questions
    └── summary-question # displays the details of answered question and allow the logged-in user to see his/her answer


