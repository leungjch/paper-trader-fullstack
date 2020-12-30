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
    buy_price NUMERIC(1000,2),
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
CREATE TABLE portfoliovaluehistory (
    tstampid SERIAL NOT NULL,
    tstamp TIMESTAMP,
    user_id INTEGER,
    netWorth NUMERIC(1000,2)
);

-- Initialize guest user
INSERT INTO users (username, hash_password, cash)
VALUES ('Guest', 'hunter2', 500000);

-- Add some random trades
-- Portfolio
INSERT INTO portfolio (user_id, ticker, n_holding, buy_price, current_price, current_total, sector, marketCap) 
VALUES
    (1, 'ELA-USD', 7500, 1.54, 1.52, 7500*1.54, 'Cryptocurrency', 26206354),
    (1, 'LTC-USD', 84, 135.51, 130.51, 84*130.51, 'Cryptocurrency', 8616181760),
    (1, 'COST', 20, 365.50, 372.25, 20*365.50, 'Consumer Defensive', 165098192896),
    (1, 'MA', 26, 337.86, 347.78, 337.86*26, 'Financial Services', 345594036224),
    (1, 'AMD', 150, 90.66, 91.66, 90.66*150, 'Technology', 109112827904),
    (1, 'V', 46, 212.61, 214, 212.61*46, 'Financial Services', 472559386624),
    (1, 'AZN', 123, 50.23, 50.23, 123*50.23, 'Healthcare', 130021933056),
    (1, 'XBIT', 1500, 16.98, 16.73, 1500*16.98, 'Healthcare', 462024864),
    (1, 'MRNA', 137, 106.80, 107.80, 137*37.87, 'Healthcare', 45265268736),
    (1, 'WMT', 23, 144.04, 145.64, 23*144.04, 'Consumer Defensive', 408266539008);



-- Trade history
INSERT INTO trade_history (user_id, ticker, trade_type, trade_n, price, date)
VALUES
    -- (1, 'AMD', 'Buy', 50, 91.66, '2020-12-10'),
    -- (1, 'AMZN', 'Buy', 5, 3101.49, '2020-12-10'),
    -- (1, 'FB', 'Buy', 10, 9.48, '2020-12-10'),
    -- (1, 'WMT', 'Buy', 10, 9.48, '2020-12-10'),
    -- (1, 'TGT', 'Buy', 100, 10.59, '2020-12-10');
    -- (1, 'BTC-USD', 'Buy', 2, 10.59, '2020-12-10');

    (1, 'ELA-USD', 'Buy', 7500, 1.54, '2020-12-10'),
    (1, 'LTC-USD', 'Buy', 84, 135.51, '2020-12-10'),
    (1, 'COST', 'Buy', 20, 365.50,'2020-12-10'),
    (1, 'MA', 'Buy', 26, 337.86, '2020-12-10'),
    (1, 'AMD', 'Buy', 150, 90.66,'2020-12-10'),
    (1, 'V', 'Buy', 46, 212.61, '2020-12-10'),
    (1, 'AZN', 'Buy', 123, 50.23, '2020-12-10'),
    (1, 'XBIT', 'Buy', 1500, 16.98, '2020-12-10'),
    (1, 'MRNA','Buy',  137, 106.80,'2020-12-10'),
    (1, 'WMT', 'Buy', 23, 144.04,'2020-12-10');
    



-- Portfolio Value