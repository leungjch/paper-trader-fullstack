-- SQL script for initializing the database

-- To load these tables into Heroku, run
-- cat setup_db.sql | heroku pg:psql postgresql-defined-91770 --app leungjch-paper-trader

-- To reset database, run
-- heroku pg:reset --confirm leungjch-paper-trader

-- Note: we use NUMERIC(1000,2) since PSQL gives a maximum of 1000 digits. We only want to round off to the first two decimals.

-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    hash_password TEXT,

    -- hash_password BYTEA,
    cash NUMERIC(1000,2)
);

-- Current portfolio
CREATE TABLE portfolio (
    user_id INTEGER,
	ticker TEXT, 
    n_holding INTEGER,
    current_price NUMERIC(1000,2),
    current_total NUMERIC(1000,2),
    sector TEXT,
    marketCap NUMERIC(1000,2)
);

-- Trade history
CREATE TABLE trade_history (
	trade_id SERIAL PRIMARY KEY,
    user_id INTEGER,
	ticker TEXT,
	trade_type TEXT, 
    trade_n INTEGER,
    price NUMERIC(1000,2),
    date TIMESTAMP
);

-- Portfolio Value History
CREATE TABLE portfolio_value_history (
    user_id INTEGER PRIMARY KEY,
    date TIMESTAMP,
    value NUMERIC(1000,2)
);

-- Initialize guest user
INSERT INTO users (username, hash_password, cash)
VALUES ('Guest', 'hunter2', 500000);

-- Add some random trades
-- Portfolio
INSERT INTO portfolio (user_id, ticker, n_holding, current_price, current_total, sector, marketCap) 
VALUES
    (1, 'TSLA', 50, 420, 500*50, 'Consumer Cyclical', 627292438528),
    (1, 'V', 10, 11, 11*10, 'Financial Services', 460060393472),
    (1, 'MRNA', 100, 12, 100*12, 'Healthcare', 48826658816);

-- Trade history
INSERT INTO trade_history (user_id, ticker, trade_type, trade_n, price, date)
VALUES
    (1, 'TSLA', 'Buy', 25, 100, '2016-06-22 19:10:25'),
    (1, 'TSLA', 'Buy', 75, 100, '2016-06-22 20:10:00'),
    (1, 'TSLA', 'Sell', 25, 100, '2016-06-22 19:10:25'),
    (1, 'V', 'Buy', 10, 9.48, '2016-06-22 19:10:25'),
    (1, 'MRNA', 'Buy', 100, 10.59, '2016-06-22 20:10:00');

-- Portfolio Value