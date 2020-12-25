-- Code for creating a new table
-- Trade history
CREATE TABLE trade_history (
	trade_id serial PRIMARY KEY,
	trade_symbol TEXT,
	trade_type TEXT, 
    trade_n INTEGER,
    trade_price NUMERIC,
    trade_date TIMESTAMP,
);
-- One liner of the above code
CREATE TABLE trade_history (	trade_id serial PRIMARY KEY,	trade_symbol TEXT, trade_type TEXT, trade_n INTEGER,trade_price NUMERIC,trade_date TIMESTAMP);



-- Current portfolio
CREATE TABLE portfolio (
	trade_symbol TEXT, 
    n_holding INTEGER,
    current_price NUMERIC,
    current_total NUMERIC,
    sector TEXT,
    size TEXT
);
-- One liner of the above code
CREATE TABLE portfolio ( trade_symbol TEXT,  n_holding INTEGER, current_price NUMERIC, current_total NUMERIC, sector TEXT, size TEXT);