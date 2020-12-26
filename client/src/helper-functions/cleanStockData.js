
function cleanStockData(data) {

    // Get important values from RapidAPI stock data
    const clean = { 
    price:               data['price']['regularMarketPrice'],
    marketCap:           data['price']['marketCap'],
    sector:              data['summaryProfile']['sector'],
    description:         data['summaryProfile']['longBusinessSummary'],
    longName:            data['quoteType']['longName'],
    recommendation:      data['financialData']['recommendationKey'],
    recommendationTrend: data['recommendationTrend']['trend']
    }
    return clean
}

export default cleanStockData;