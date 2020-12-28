
function cleanStockData(data) {

    var summary = "";
    var price = 0;
    var sector = data['sector'] === null ? "N/A" : data['sector'];
    // Get important values from RapidAPI stock data
    if ("longBusinessSummary" in data && data['longBusinessSummary'].length !== 0) {
        summary = data['longBusinessSummary']
    } else if ("description" in data &&  data['description'] !== 0) {
        summary = data['description']
    }

    if ("price" in data) {
        price = data['price']
    } else if ("regularMarketPrice" in data &&  data['regularMarketPrice'] !== 0) {
        price = data['regularMarketPrice']
    }

    if (data['quoteType'] === 'CRYPTOCURRENCY') {
        sector = "Cryptocurrency"
    }

    const clean = { 
    ticker:              data['symbol'],
    price:               price,
    marketCap:           data['marketCap'],
    sector:              sector,
    description:         summary,
    longName:            data['longName'],
    imgUrl:              data['logo_url'],
    forwardPE:           data['forwardPE']
    }

    return clean
}

export default cleanStockData;