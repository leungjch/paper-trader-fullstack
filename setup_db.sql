-- SQL script for initializing the database

-- To load these tables into Heroku, run
-- cat setup_db.sql | heroku pg:psql postgresql-defined-91770 --app leungjch-paper-trader

-- To reset database, run
-- heroku pg:reset --confirm leungjch-paper-trader

-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username text,
    hash_password BYTEA,
    cash NUMERIC
);

-- Trade history
CREATE TABLE trade_history (
	trade_id SERIAL PRIMARY KEY,
    trade_user_id INTEGER,
	trade_symbol TEXT,
	trade_type TEXT, 
    trade_n INTEGER,
    trade_price NUMERIC,
    trade_date TIMESTAMP
);

-- Current portfolio
CREATE TABLE portfolio (
    user_id INTEGER,
	trade_symbol TEXT, 
    n_holding INTEGER,
    current_price NUMERIC,
    current_total NUMERIC
    -- sector TEXT,
    -- size TEXT
);

INSERT INTO users (username, hash_password, cash)
VALUES ('john', 'hunter2', 100);