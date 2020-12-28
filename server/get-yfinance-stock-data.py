import yfinance as yf
import json
import sys
import pandas as pd
ticker =  sys.argv[1]
requestType = sys.argv[2]
stockData = yf.Ticker(ticker)

if requestType == "info":
    try:
        print(json.dumps(stockData.info))
    except ValueError:
        print("{empty: true}")
elif requestType == "recommendations":
    try:
        rec = stockData.recommendations
        if rec.empty:
            print("{empty:true}")
        else:
            print(rec['To Grade'].tail(5).mode()[0])

    except ValueError:
        print("{empty:true}")

elif requestType == "timeseries":
    try:
        hist = stockData.history(period="1mo")
        if hist.empty:
            print("{empty:true}")
        else:
            print(hist[['Close']].to_json(orient="index"))

    except ValueError:
        print("{empty:true}")

elif requestType == "bulkPrice":
    prices = []
    # Decode json string into Python list
    tickers = json.loads(sys.argv[1])
    for tick in tickers:
        # print("TICK IS", tick)
        
        # Get price data
        # prices.append({"ticker": tick, "history": yf.Ticker(tick).history(period="2mo")[['Close']].reset_index().to_dict('records')})

        #  Get last price data
        prices.append({"ticker": tick, "price": yf.Ticker(tick).info['regularMarketPrice']})
    print(prices)

elif requestType == "bulkPriceCalculatePortfolio":
    # portfolio = [{"ticker": 'TSLA', "n_holding":10}, {"ticker": 'MSFT', "n_holding":5}, {"ticker": 'BTC-USD', "n_holding":3}]
    portfolio = json.loads(sys.argv[1])
    # print(portfolio)
    data = pd.DataFrame()

    for stock in portfolio:
        # Get values
        tick = stock['ticker']
        n_holding = stock['n_holding']

        # Query price history
        hist = yf.Ticker(tick).history(period="2mo")[['Close']]

        # Append column
        data = pd.concat([data, hist], axis=1)
        # Rename column to tick
        data.rename({'Close': tick}, axis='columns', inplace=True)
        # Multiply value by holding
        data[[tick]] *= n_holding

    # Fill NA values
    data.fillna(method='ffill', inplace=True)

    data['Sum'] = data.sum(axis=1)

    portfolioValueHistory = data['Sum'].reset_index()
    
    # Convert timestamp to date
    portfolioValueHistory['Date'] = portfolioValueHistory['Date'].dt.strftime('%Y-%m-%d')

    portfolioValueHistory = portfolioValueHistory.to_dict('records')
    # print(data)
    print(portfolioValueHistory)

sys.stdout.flush()