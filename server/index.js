const express = require('express');
const cors = require('cors')
const path = require('path');
const { getStockInfo, getUsers, getUserByName, addUsers, getPortfolios, getPortfolioById, getHistoryById, addHistory} = require('./rest-crud-queries');
const { STOCK_API_KEY } = require('./config')


const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
}

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

// Search API
app.get('/api/search/:ticker', getStockInfo)




app.listen(PORT, function () {
  console.error(`App listening on port ${PORT}`);
  
});
