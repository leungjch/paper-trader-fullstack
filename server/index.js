const express = require('express');
const cors = require('cors')
const path = require('path');
const { getYFinance, getPortfolioValueHistory, clearPortfolioValueHistory, getPortfolioHistoryBackforecast, addPortfolioWorthEntry, updatePortfolioByStock, sellPortfolioByStock, getPortfolioVoid, getPortfolioByStock, deleteFromPortfolioById, getStockInfo, getUsers, getUserByName, addUsers, getPortfolios, getPortfolioById, getHistoryById, addHistory, addToPortfolioById, addCashById, getUsersVoid, updatePriceInPortfolio} = require('./rest-crud-queries');
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
app.put('/api/users/:id/:addCash', addCashById)

// Portfolio APIs
app.get('/api/portfolio', getPortfolios);
app.get('/api/portfolio/:id', getPortfolioById);
app.get('/api/portfolio/:id/:stock', getPortfolioByStock)
app.post('/api/portfolio/:id', addToPortfolioById);
app.put('/api/portfolio/:id/:stock', updatePortfolioByStock);
app.put('/api/portfolio/sell/:id/:stock', sellPortfolioByStock);
app.delete('/api/portfolio/:id/:stock', deleteFromPortfolioById)

// History APIs
app.get('/api/history/:id', getHistoryById);
app.post('/api/history/', addHistory);

// Search API
app.get('/api/search/:ticker', getStockInfo)

// Yfinance API
app.get('/api/yfinance/:stock/:type', getYFinance)

app.get('/api/portfolioValueHistory/:id', getPortfolioValueHistory)

// Redirect user to login page if unauthenticated
app.get('*', function(req, res) {
  res.redirect('/');
});

// Update portfolio prices every 15 minutes
// Back-forecast portfolio values
async function updatePortfolioEverything() {
  var userList =  await getUsersVoid();
  await clearPortfolioValueHistory(); // Clear history to fetch new 30-day back-forecast
  console.log(userList)
  for (var user of userList) {
    var userId = await user['id'];
    var portfolio = await getPortfolioVoid(userId);

    await updatePriceInPortfolio(user['id'], portfolio);
    // await addPortfolioWorthEntry(user, portfolio);
    await getPortfolioHistoryBackforecast(user, portfolio);

  }
  await console.log("Done updating portfoliovaluehistory")

}
updatePortfolioEverything();
setInterval(updatePortfolioEverything, 15*60*1000);  // update every 15 minutes

app.listen(PORT, function () {
  console.error(`App listening on port ${PORT}`);
});
