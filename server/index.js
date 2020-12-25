const express = require('express');
const cors = require('cors')
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Connect to Heroku PostgreSQL DB
const { Pool } = require('pg');

const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
  connectionString: "postgres://iioxcfyrutgczy:80f3200be4abf011168dbef178c5049a1682df9944e1e2eabc45c58a4947312c@ec2-52-44-139-108.compute-1.amazonaws.com:5432/dek0oshg3gkfo4",
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

// pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }

// });

const app = express();
app.use(cors())
app.use(express.json());
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

// ----------------------------------------------------------------------------
// IMPLEMENT API HERE
// 
// ----------------------------------------------------------------------------
// User API
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    console.log("Server: Successfuly get users");
  });
}

const addUsers = (request, response) => {
  console.log("Server: Received adduser data as", request.body)

  const {username, hash_password, cash} = request.body
  pool.query("INSERT INTO users (username, hash_password, cash) VALUES($1, $2, $3)",
              [username, hash_password, cash],
              (error) => {
                if (error) {
                  throw error
                }
                response.status(201).json({status: 'success', message:'User added.'})
          }
      )
}

app
  .route('/api/users')
  // GET
  .get(getUsers)
  // POST
  .post(addUsers)




app.listen(PORT, function () {
  console.error(`App listening on port ${PORT}`);
});
