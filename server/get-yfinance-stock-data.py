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
   

sys.stdout.flush()