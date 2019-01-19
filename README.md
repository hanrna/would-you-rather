# Would You Rather Project

This is the project for the final assessment project for Udacity's React Redux course.

This project is a web app that lets a user play the “Would You Rather?” game. The game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is against the rules.A user could view each question, vote questions, check vote results, create new question and check leader board.

In this project, we use React js for frontend rendering, use Redux to manage states, and React Router to handle routing. The server side API is provided by Udacity API.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

## TL;DR

To get started with this project:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions
    │   ├── authedUser.js # User authentication related actions
    │   ├── questions.js # Questions related actions
    │   ├── shared.js # Shared actions for both users and questions
    │   └── users.js # Users related actions
    ├── components # All components of this app
    │   ├── App.js # Entry point of all components
    │   ├── LeaderBoard.js # Component for leader board page
    │   ├── Login.js # Component for login page
    │   ├── NavigationBar.js # Component for top vavigation bar
    │   ├── NewQuestion.js # Component for creating new question page
    │   ├── NotFound.js # Component for 404 not found page
    │   ├── Question.js # Component for question detail page
    │   └── QuestionList.js # Component for homepage which list all unanswered questions and answered questions
    ├── middleware
    │   ├── index.js # Apply middleware
    │   └── logger.js # Logger middleware to log all actions and state change
    ├── reducers
    │   ├── authedUser.js # Reducer to handle user authentication
    │   ├── index.js # Combined reducer
    │   ├── questions.js # Reducer to handle questions related actions
    │   └── users.js # Reducer to handle users related actions
    ├── resources
    │   └── images
    │       ├── avatar1.png # User avatar
    │       ├── avatar2.png # User avatar
    │       ├── avatar3.png # User avatar
    │       └── logo.svg # Logo show on login page
    ├── styles # Folder contains all css files of this project
    │   ├── common.css # Common styles shared between all components
    │   ├── index.css # Global styles. You probably won't need to change anything here.
    │   ├── leaderBoard.css # LeaderBoard component style
    │   ├── login.css # Login component style
    │   ├── navigationBar.css # NavigationBar component style
    │   ├── newQuestion.css # NewQuestion component style
    │   ├── notFound.css # NotFound component style
    │   ├── question.css # Question component style
    │   └── questionList.js # QuestionList component style
    ├── utils
    │   └── _DATA.js # A JavaScript API for the provided Udacity backend.Instructions for the methods are below
    ├──
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.

```

## Backend API Provided by Udacity
The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the application. We recommend using the [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

#### Data

There are two types of objects stored in our database:

* Users
* Questions

#### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

#### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

#### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).