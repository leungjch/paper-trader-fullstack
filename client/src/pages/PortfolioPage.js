import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table, Row, Card, Container, Col } from 'react-bootstrap';
import BarChart from "../components/BarChart"
import PieChart from "../components/PieChart"
import AreaChart from "../components/AreaChart"
import TreeMap from "../components/TreeMap"

import { UserContext, UserProvider } from '../UserContext';
import formatNumber from '../helper-functions/formatNumber'
import abbreviateNumber from "../helper-functions/abbreviateNumber"

function PortfolioPage() {

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
                console.log("Client: Loaded portfolio data", data);
                console.log("User info is, ", user)
                setPortfolioData(data);
                computeSectors(data)
                computeMarketCaps(data)
            })



        // Also get the amount of cash that user currently has
        fetch('/api/users/' + user.name)
            .then((response) => response.json())
            .then((data) => {
                console.log('data is', data)
                setCash(data[0].cash);
            })

        // Also get the portfolio value history
        fetch('/api/portfolioValueHistory/' + user['id'])
            .then((response) => response.json())
            .then((data) => {
                console.log('Portfoliovaluehistory is', data)
                setPortfolioHistory(data);

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
        let obj = [{ label: "Micro", val: micro }, { label: "Small", val: small }, { label: "Medium", val: medium }, { label: "Large", val: large }]

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
        // <div>
        //     <h2> Your Portfolio </h2>
        //     <h3> Available Cash: ${formatNumber(cash)} </h3>
        //     <h3> Portfolio Value: $ { portfolioHistory.length !== 0? formatNumber(portfolioHistory[portfolioHistory.length-1]['networth']) : "Loading"} </h3>
            // <Table striped hover>
            //     <thead>
            //         <tr>
            //             <th>Ticker</th>
            //             <th>Number of shares</th>
            //             <th>Average buy-in price</th>
            //             <th>Current price</th>
            //             <th>Percentage change</th>
            //             <th>Total value</th>
            //             <th>Sector</th>
            //             <th>Market cap</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {portfolioData.map(renderPortfolioRow)}
            //     </tbody>
            // </Table>

        //     <BarChart data={portfolioData} width={500} height={100} />
        //     {portfolioStatistics_mCapAggregate !== null ? <PieChart data={portfolioStatistics_mCapAggregate} /> : ''}
        //     <AreaChart data={portfolioHistory} />
        //     {portfolioStatistics_sectorsTreeMap !== null? <TreeMap data = {portfolioStatistics_sectorsTreeMap} /> : ''}
        // </div>

        <Container>

            <Row>
                <Col xs={8} md={4} fluid id={"left"}>
                    {/* Key statistics card */}
                        <Card>
                            <Card.Title>Key Statistics</Card.Title>
                            <Container>
                                <Row>
                                    <Col> 
                                        <div>
                                        <h8>
                                            Portfolio Value
                                        </h8>
                                        <h4>
                                            ${ portfolioHistory.length !== 0? formatNumber(portfolioHistory[portfolioHistory.length-1]['networth']) : "Loading"}
                                        </h4>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div>
                                            <h8>
                                                % Profit
                                            </h8>
                                            <h4>
                                                { portfolioHistory.length !== 0? ((parseFloat(portfolioHistory[portfolioHistory.length-1]['networth'])-parseFloat(portfolioHistory[0]['networth']))/parseFloat(portfolioHistory[0]['networth'])*100).toFixed(3) : "Loading" }%
                                            </h4>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div>
                                            <h8>
                                            Cash Reserve
                                            </h8>
                                            <h4>
                                                ${formatNumber(cash)}
                                            </h4>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div>
                                            <h8>
                                                Assets Owned
                                            </h8>
                                            <h3>
                                                {portfolioData.length}
                                            </h3>
                                        </div>
                                    </Col>
                                </Row>

                            </Container>
                        </Card>
                </Col>
                    {/* Portfolio value chart */}
                    <Col xs={4} md={8} id={"right"}>
                    <AreaChart height = {400} width = {700} data={portfolioHistory} />
                
                </Col>

                <Col xs={8} md={4} fluid id={"left"}>
                    {portfolioStatistics_sectorsTreeMap !== null? <TreeMap data = {portfolioStatistics_sectorsTreeMap} /> : ''}
                </Col>

                <Col xs={8} md={4} fluid id={"left"}>
                <Table striped hover>
                <thead>
                    <tr>
                        <th>Asset</th>
                        <th>Shares</th>
                        <th>Buy-in price</th>
                        <th>Current price</th>
                        <th>% Profit</th>
                        <th>Total value</th>
                        <th>Sector</th>
                        <th>Market cap</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolioData.map(renderPortfolioRow)}
                </tbody>
            </Table>
                </Col>                
            </Row>

            <Row>
                <Col>
                    <BarChart data={portfolioData} width={500} height={100} />
                </Col>

                <Col>
                    {portfolioStatistics_mCapAggregate !== null ? <PieChart data={portfolioStatistics_mCapAggregate} /> : ''}
                </Col>
            </Row>
        </Container>


    );
}

export { PortfolioPage };
