import yfinance as yf
import pandas as pd
data = pd.DataFrame()
portfolio = [{"ticker": 'TSLA', "n_holding":10}, {"ticker": 'MSFT', "n_holding":5}, {"ticker": 'BTC-USD', "n_holding":3}]

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

portfoliovaluehistory = data['Sum'].reset_index().to_dict('records')

# print(data)
print(portfoliovaluehistory)