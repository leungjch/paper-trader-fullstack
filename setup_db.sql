-- SQL script for initializing the database

-- To load these tables into Heroku, run
-- cat setup_db.sql | heroku pg:psql postgresql-defined-91770 --app leungjch-paper-trader

-- To reset database, run
-- heroku pg:reset --confirm leungjch-paper-trader to clear everything
-- Trade history
CREATE TABLE trade_history (
	trade_id serial PRIMARY KEY,
	trade_symbol TEXT,
	trade_type TEXT, 
    trade_n INTEGER,
    trade_price NUMERIC,
    trade_date TIMESTAMP
);

-- Current portfolio
CREATE TABLE portfolio (
	trade_symbol TEXT, 
    n_holding INTEGER,
    current_price NUMERIC,
    current_total NUMERIC
    -- sector TEXT,
    -- size TEXT
);