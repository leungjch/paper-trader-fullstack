const express = require('express');
const cors = require('cors')
const path = require('path');
const { getUsers, getUserByName, addUsers, getPortfolios, getPortfolioById, getHistoryById, addHistory} = require('./rest-crud-queries');
const { STOCK_API_KEY } = require('./config')


const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;


const app = express();

app.use(cors())
app.use(express.json());
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

// User APIs
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUserByName);
app.post('/api/users', addUsers);

// Portfolio APIs
app.get('/api/portfolio', getPortfolios);
app.get('/api/portfolio/:id', getPortfolioById);

// History APIs
app.get('/api/history/:id', getHistoryById);
app.post('/api/history/', addHistory);

app.listen(PORT, function () {
  console.error(`App listening on port ${PORT}`);
  
});
