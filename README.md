# Title of Project: EchoChamber

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents:

- [Username](#username)
- [Project Description](#description)
- [License](#license)
- [Command to install](#command-to-install)
- [Instructions for users](#instructions-for-users-of-the-app)
- [Features of the project](#features-of-the-project)
- [Link to GitHub Repo](#Link-to-Git-hub-repo.)
- [Screenshot of Application](#Screenshot-of-Application)
- [Bugs](#bugs)
- [Version History](#Version-history)
- [Link to video](#Link-to-video)
- [How to contribute](#how-to-contribute)
- [Questions](#questions)

## Username

    Laura-Kam

## Description

This app has built an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list to keep track of their 'followers'. Apps used are Express.js for routing, a MongoDB database, and the Mongoose ODM. A JavaScript date library is used as well as a native JavaScript Date object to modify timestamps.

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## License

MIT

## Command to install

npm i.

## Instructions for users of the app

Clone the application, install dependencies: Nodemon, Express, MongoDB and Mongoose. Then run the app using nodemon server.js using 'npm start'.

## Features of the project

It is a command-line application, which uses an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list to keep track of their 'followers'.

## Link to Git-hub repo.

[Link to repo](https://github.com/Laura-Kam/EchoChamber/)

## Screenshot of application:

[Screenshot of website](https://github.com/Laura-Kam/EchoChamber/issues/1#issue-1437389159)

## Bugs

- Post for users did not work. Issue resolved - used capital letters for username - this was not allowed.
- Syntax error router.router - fixed router.route.
- ReactionId was not being found- issue resolved, wrong id key was being used.

## Version history

- 0.1 models created.
- 0.2 Established connection and finished models.
- 0.3 Completed routes with express.
- 0.4 Created delete routes.
- 0.5 created controllers.

# Link to video

- [EchoChamber Video Google Drive](https://drive.google.com/file/d/1LfQB0In41m-Y6bdQfYOsYOGHTE7bVNL-/view)

- [EchoChamber Screencastify](https://watch.screencastify.com/v/8j1t8SawFdbpT6eB2XDT)

## How to contribute

Git clone the repo, work on the code, then make a pull request.

## Questions

If you have any questions, or would like to get in touch find me on GitHub [Laura-Kam](https://github.com/Laura-Kam)
or email me at laura_ek@yahoo.co.uk.
