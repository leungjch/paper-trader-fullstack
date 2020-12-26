# Dev log
This project is integrating a lot of technologies together, so I think it is worth documenting what I've done over the course of this project. I've worked with Node and React a few times before, but I think that this is my first 'serious' full stack project. 

## Dec 24 2020
I first started up the general structure of the project by setting up React + Node. [I followed this guide](https://github.com/mars/heroku-cra-node), which is very useful for knowing what exactly to do if you will be deploying to Heroku. 

I then did some reading about Heroku's support for SQL. They support PostgreSQL as a simple service that you can enable. This gives you a database that you can use (and connect to remotely as you develop). Since I had only worked with SQL a few times, this took me a bit of time to get familiarized with and to set up the tables. As of now, I'm still unsure how to perform the CRUD operations from the React client. 

## Dec 25 2020
I updated the  `setup_db.sql` script to be used so that it can easily initialize/reset the database for testing.

Heroku has handy CLI commands to interact remotely with the database they provide to you. Run `heroku pg:psql` to connect to your database and `heroku pg:reset` to clear the database. 

Node.js and Express are used here to process the API requests from the React app. We will implement a RESTful API. 

I got a simple API to work with fetching the users, and figured out the interaction between the Node backend and the React client. Now, I need to write out all the other trade history / portfolio APIs. Once we have the database all set up, I will need to start on fetching data from the stocks API (currently, I chose RapidAPI). 

I've implemented the basic structure of the multi-page React frontend, using React router. The tricky part will be handling user authentication (prevent users from entering other pages of the site if they aren't logged in). 

I created APIs for the portfolio. All that's left is creating an API for the transaction histories (which should be very similar to the portfolio), and then working with the external API to fetch real stock data. After that, I need to start working on the data visualization for the portfolio dashboard, and once that's done, we have a MVP. I also got the login screen to work with some basic user authentication, and can display the portfolio holdings. 
