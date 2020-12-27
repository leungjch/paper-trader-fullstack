import yfinance as yf
import json
import sys
import pandas
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
        print(json.dumps(stockData.recommendations.to_json))
    except ValueError:
        print("{empty:true}")

sys.stdout.flush()