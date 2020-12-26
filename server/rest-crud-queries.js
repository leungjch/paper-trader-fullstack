/*
REST API query functions

------------------- Users -----------------------
GET    /api/users/        getUsers()
POST   /api/users/        addUsers()
GET     /api/users/:id     getUserByName()

------------------- Portfolio -------------------
GET     /api/portfolio/     getPortfolios()

---------- Stock Info (External API) ------------
GET     /api/search/:symbol    searchStockbySymbol()

------------------- Buy -------------------------
POST     /api/holdings/:symbol    buyStockbySymbol()

------------------- Sell ------------------------
UPDATE     /api/holdings/:symbol    sellStockBySymbol()
DELETE     /api/holdings/:symbol    sellAllStockBySymbol()

*/


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


// ----------------------------------------------------------------------------
// IMPLEMENT API HERE
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

// Get a single user by their username
const getUserByName = (request, response) => {
    const username = request.params.id
    console.log(username)
    pool.query('SELECT * FROM users WHERE username = $1',
        [username], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const addUsers = (request, response) => {
    console.log("Server: Received adduser data as", request.body)

    const { username, hash_password, cash } = request.body
    pool.query("INSERT INTO users (username, hash_password, cash) VALUES($1, $2, $3)",
        [username, hash_password, cash],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'User added.' })
        }
    )
}

module.exports = {
    getUsers,
    getUserByName,
    addUsers,
}