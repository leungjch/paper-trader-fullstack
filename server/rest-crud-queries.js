/*
REST API query functions

------------------- Users -----------------------
GET    /api/users/        getUsers()
POST   /api/users/        addUsers()
GET     /api/users/:id     getUserByName()

------------------- Portfolio -------------------
GET     /api/portfolio/     getPortfolios()
GET     /api/portfolio/:id  getPortfolioById()

---------- Stock Info (External API) ------------
GET     /api/search/:symbol    searchStockbySymbol()

------------------- Buy -------------------------
POST     /api/holdings/:symbol    buyStockbySymbol()

------------------- Sell ------------------------
UPDATE     /api/holdings/:symbol    sellStockBySymbol()
DELETE     /api/holdings/:symbol    sellAllStockBySymbol()

------------------- History ---------------------
GET     /api/history/:id        getHistoryById()
POST    /api/history            addHistory()

*/

// Connect to Heroku PostgreSQL DB
const { Pool } = require('pg');

// Get api key
const { STOCK_API_KEY } = require('./config')


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
// ----------------------------------------------------------------------------
// Portfolio API
const getPortfolios = (request, response) => {
    pool.query('SELECT * FROM portfolio', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        console.log("Server: Successfuly get portfolios");
    });
}

const getPortfolioById = (request, response) => {
    const username = request.params.id
    console.log(username)
    pool.query('SELECT * FROM portfolio WHERE user_id = $1',
        [username], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

// ----------------------------------------------------------------------------
// Transaction history API
const getHistoryById = (request, response) => {
    const userId = request.params.id
    console.log(userId)
    pool.query('SELECT * FROM trade_history WHERE user_id = $1',
        [userId], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const addHistory = (request, response) => {
    console.log("Server: Received addHistory data as", request.body)

    const { user_id, ticker, trade_type, trade_n, price, date } = request.body
    pool.query("INSERT INTO users (username, hash_password, cash) VALUES($1, $2, $3, $4, $5, $6)",
        [user_id, ticker, trade_type, trade_n, price, date],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Transaction successfully recorded.' })
        }
    )
}

module.exports = {
    getUsers,
    getUserByName,
    addUsers,

    getPortfolios,
    getPortfolioById,

    getHistoryById,
    addHistory
}