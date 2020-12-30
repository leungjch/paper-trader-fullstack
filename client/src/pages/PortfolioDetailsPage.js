import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table, Row, Card, Container, Col } from 'react-bootstrap';
import '../App.css'


import { UserContext, UserProvider } from '../UserContext';
import formatNumber from '../helper-functions/formatNumber'
import abbreviateNumber from "../helper-functions/abbreviateNumber"

function PortfolioDetailsPage() {

    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")
    const [cash, setCash] = useState("")

    const [authenticated, setAuthenticated] = useState(false)
    const [portfolioData, setPortfolioData] = useState([])
    const [portfolioStatistics_mCapAggregate, setPortfolioStatistics_mCapAggregate] = useState(null)
    const [portfolioStatistics_sectorsTreeMap, setPortfolioStatistics_sectorsTreeMap] = useState(null)

    const [portfolioHistory, setPortfolioHistory] = useState([])

    const { user } = useContext(UserContext);
    // https://aesalazar.com/blog/professional-color-combinations-for-dashboards-or-mobile-bi-applications

    // Fetch portfolio data for user from DB
    function getPortfolio() {
        console.log("Portfolio request is", "/api/portfolio/" + userId)
        fetch('/api/portfolio/' + userId)
            .then((response) => response.json())
            .then((data) => {
                setPortfolioData(data);
            })


    }

    function renderPortfolioRow(item, index) {
        return (
            <tr key={index}>
                <td>{item.ticker}</td>
                <td>{item.n_holding}</td>
                <td>${item.buy_price}</td>
                <td>${item.current_price}</td>
                <td>{(100 * (item.current_price - item.buy_price) / item.buy_price).toFixed(2)}%</td>
                <td>${item.current_total}</td>
                <td>{item.sector}</td>
                <td>${abbreviateNumber(item.marketcap)}</td>

            </tr>
        )
    }

    // Compute data for feeding into TreeMap
    function computeSectors(data) {

        const result = [];

        for (const stock of data) {

            if (result.some(e => e.name === stock['sector'])) {
                for (let obj of result) {

                    if (obj['name'] === stock['sector']) {
                        obj['children'].push({ "name": stock['ticker'], "value": stock['current_total'], "colname": 3 })
                    }

                }

            } else result.push({ "name": stock['sector'], "children": [{ "name": stock['ticker'], "value": stock['current_total'], "colname": 3 }], "colname": 2 })

        }
        const finalResult = { "name": "Sectors", "colname": 1, "children": result }


        console.log("TREEMAP", finalResult);
        setPortfolioStatistics_sectorsTreeMap(finalResult);
    }

    // Large cap: 10B+
    // Mid cap: 2-10B
    // Small cap: 0.3-2B
    // Micro cap: < 0.3B
    // Tabulate stocks by market cap
    // For market cap donut/pie chart
    function computeMarketCaps(data) {
        let large = 0
        let medium = 0
        let small = 0
        let micro = 0
        let portfolioDta = data
        for (var j = 0; j < portfolioDta.length; j++) {
            let mCap = parseFloat(portfolioDta[j]['marketcap'])
            let holding = parseFloat(portfolioDta[j]['current_total'])
            // Micro cap
            console.log("Marketdd caps data:::", j, mCap, portfolioDta.length)
            if (mCap < 0.3e9) {
                micro += holding

                // Else Small cap
            } else if (mCap < 2e9) {
                small += holding
                // Else medium cap
            } else if (mCap < 10e9) {
                medium += holding
                // Else large cap
            } else {
                large += holding
            }
        }
        const total = micro + small + medium + large
        let obj = [{ label: "Micro", val: micro, total: total }, { label: "Small", val: small, total: total }, { label: "Medium", val: medium, total: total }, { label: "Large", val: large, total: total }]

        let cleanObj = obj.filter(function (el) {
            return el['val'] !== 0
        })

        console.log("Market caps obj is", cleanObj)
        setPortfolioStatistics_mCapAggregate(cleanObj);
    }

    useEffect(() => {
        // Fetch portfolio data
        getPortfolio()
        // 
    }, [cash]);

    return (
        
        <div className="DivBoxBig">
            <div>
                <h2> Portfolio Details </h2>
            </div>

            <div>
            <Table striped hover>
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Number of shares</th>
                    <th>Average buy-in price</th>
                    <th>Current price</th>
                    <th>Percentage change</th>
                    <th>Total value</th>
                    <th>Sector</th>
                    <th>Market cap</th>
                </tr>
            </thead>
            <tbody>
                {portfolioData.map(renderPortfolioRow)}
            </tbody>
        </Table>

            </div>

        </div>




    );
}

export { PortfolioDetailsPage };
