const dotenv = require('dotenv');

// Get env variables
dotenv.config();

module.exports = {
    STOCK_API_KEY : process.env.STOCK_API_KEY
};