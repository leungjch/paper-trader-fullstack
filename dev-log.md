# Dev log
This project is integrating a lot of technologies together, so I think it is worth documenting what I've done over the course of this project. I've worked with Node and React a few times before, but I think that this is my first 'serious' full stack project. 

## Dec 24 2020
I first started up the general structure of the project by setting up React + Node. [I followed this guide](https://github.com/mars/heroku-cra-node), which is very useful for knowing what exactly to do if you will be deploying to Heroku. 

I then did some reading about Heroku's support for SQL. They support PostgreSQL as a simple service that you can enable. This gives you a database that you can use (and connect to remotely as you develop). Since I had only worked with SQL a few times, this took me a bit of time to get familiarized with and to set up the tables. As of now, I'm still unsure how to perform the CRUD operations from the React client. 

## Dec 25 2020
I updated the  `setup_db.sql` script to be used so that it can easily initialize/reset the database for testing.

Node.js and Express are used here to process the API requests from the React app. We will implement a RESTful API. 