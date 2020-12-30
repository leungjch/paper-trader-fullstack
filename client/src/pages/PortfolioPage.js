import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table, Row, Card, Container, Col } from 'react-bootstrap';
import BarChart from "../components/BarChart"
import PieChart from "../components/PieChart"
import AreaChart from "../components/AreaChart"
import TreeMap from "../components/TreeMap"
import BarChartNegative from "../components/BarChartNegative"
import VerticalBarChartNegative from "../components/VerticalBarChartNegative"

import { AiFillStar, AiFillDollarCircle, AiOutlineAreaChart } from 'react-icons/ai';
import { RiStackFill } from 'react-icons/ri'
import '../App.css'



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
    const [portfolioStatistics_profitLoss, setPortfolioStatistics_profitLoss] = useState(null);

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
                profitLossCalculator(data)
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


    // Code for rendering portfolio table
    function renderPortfolioRow(item, index) {
        const percentageChange = (100 * (item.current_price - item.buy_price) / item.buy_price).toFixed(2)
        const profitLossIndicator = percentageChange > 0 ? "#a6d854" : "#fc8d62"; // Red if loss, green if profit
        return (
            <tr key={index}>
                <td>{item.ticker}</td>
                <td>{item.n_holding}</td>
                <td>${item.current_price}</td>
                <td><div style={{ backgroundColor: profitLossIndicator, borderRadius: "0.2em", padding: "0%", textAlign: "center" }}>{percentageChange}%</div></td>
                <td>${(parseFloat(item.n_holding) * parseFloat(item.current_price) - (parseFloat(item.n_holding) * parseFloat(item.buy_price))).toFixed(2)}</td>

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

    // Calculate Profit Loss by Sector
    function profitLossCalculator(data) {
        const result = [];

        for (const stock of data) {

            // If sector exists
            if (result.some(e => e.name === stock['sector'])) {
                for (let obj of result) {

                    if (obj['name'] === stock['sector']) {
                        obj['worthNew'] = obj['worthNew'] + stock['current_price'] * stock['n_holding']
                        obj['worthOld'] = obj['worthOld'] + stock['buy_price'] * stock['n_holding']
                    }
                }
            } else result.push({ "name": stock['sector'], "worthNew": stock['current_price'] * stock['n_holding'], 'worthOld': stock['buy_price'] * stock['n_holding'] })
        }

        for (let i = 0; i < result.length; i++) {
            result[i]['value'] = ((result[i]['worthNew'] - result[i]['worthOld']) / result[i]['worthOld']) * 100
            result[i]['current_total'] = result[i]['value']
            result[i]['ticker'] = result[i]['name']
        }
        const finalResult = result;

        console.log("Profit/Loss", finalResult);
        setPortfolioStatistics_profitLoss(finalResult);
    }

    // Get biggest gainers and losers
    function gainersLosers(portfolio) {
        const result = []
        for (const stock of portfolio) {
            let percentageChange = (100 * (stock.current_price - stock.buy_price) / stock.buy_price).toFixed(2);
            result.push({ name: stock['ticker'], value: percentageChange })
        }
        return result
    }

    useEffect(() => {
        // Fetch portfolio data
        getPortfolio()
        // 
    }, [cash]);

    // Set margin for rows
    const rowStyle = {
        display:"flex",
        justifyContent:"center",
        margin:"0.2%",
        padding: "0%",
    };

    const cardTitleStyle = {
        fontSize: '24px'
    }

    const cardStyle = {
        boxShadow: "0 2px 2px rgb(156, 156, 156),0 2px 2px rgba(189, 189, 189, 0.192),0 4px 4px rgba(184, 184, 184, 0.15),0 12px 12px rgba(197, 197, 197, 0.1),0 16px 16px rgba(0,0,0,0.05)",
        padding:"0%",
        margin:"0%",
        display: 'inline-block',

        position:"relative",
        width:"98%",
        verticalAlign:"top",
        
    }
    const colStyle = {
        marginLeft:"0.0%",
        marginRight:"0.0%"
    }


    return (

        <Container fluid style={{ margin: "0%", padding: 0 }}>
            <Row style={rowStyle} noGutters={true}>

            </Row>
            <Row  noGutters={true}>
                {/* Key statistics card */}

                <Col  noGutters={true} className="colStats">
                    <div className="DivBoxSmall" style={{ borderLeft: "0.5em solid #02a8c2" }}>
                        <div>
                            <div className="DivBoxText" style={{ color: "#02a8c2" }}>
                                Total Value
                                        </div>
                            <div className="DivBoxStatistic" style={{ color: "#02a8c2" }}>

                                ${portfolioHistory.length !== 0 ? formatNumber(portfolioHistory[portfolioHistory.length - 1]['networth']) : "Loading"}
                            </div>

                        </div>

                        <AiOutlineAreaChart size={"15%"} color={"#02a8c2"} />

                    </div>
                </Col>

                <Col  noGutters={true} className="colStats">
                    <div className="DivBoxSmall" style={{ borderLeft: "0.5em solid #a6d854" }}>
                        <div>
                            <div className="DivBoxText" style={{ color: "#a6d854" }}>
                                % Profit
                                        </div>
                            <div className="DivBoxStatistic" style={{ color: "#a6d854" }}>
                                {portfolioHistory.length !== 0 ? ((parseFloat(portfolioHistory[portfolioHistory.length - 1]['networth']) - parseFloat(portfolioHistory[0]['networth'])) / parseFloat(portfolioHistory[0]['networth']) * 100).toFixed(3) : "Loading"}%
                                        </div>
                        </div>

                        <AiFillStar size={"15%"} color={"#a6d854"} />
                    </div>
                </Col>


                <Col noGutters={true} className="colStats">
                    <div className="DivBoxSmall" style={{ borderLeft: "0.5em solid #69b3a2" }}>
                        <div>
                            <div className="DivBoxText" style={{ color: "#69b3a2" }}>
                                Total Cash
                                        </div>
                            <div className="DivBoxStatistic" style={{ color: "#69b3a2" }}>
                                ${formatNumber(cash)}
                            </div>
                        </div>

                        <AiFillDollarCircle size={"15%"} color={"#69b3a2"} />
                    </div>
                </Col>


                <Col  noGutters={true} className="colStats">
                    <div className="DivBoxSmall" style={{ borderLeft: "0.5em solid #fc8d62" }}>
                        <div>
                            <div className="DivBoxText" style={{ color: "#fc8d62" }}>
                                Assets
                                            </div>
                            <div className="DivBoxStatistic" style={{ color: "#fc8d62" }}>
                                {portfolioData.length}
                            </div>

                        </div>
                        <RiStackFill size={"15%"} color={"#fc8d62"} />
                    </div>
                </Col>



            </Row>

            <Row style={rowStyle} noGutters={true}>


                <Col style={colStyle}  md = {6} lg={6} sm = {6} noGutters={true}>

                    <Card style={cardStyle}>
                        <Card.Header style={cardTitleStyle}>
                            Portfolio Details
                        </Card.Header>
                        <Card.Body>
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Shares</th>
                                        <th>Current price</th>
                                        <th>% Profit</th>
                                        <th>Profit / Loss</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {portfolioData.map(renderPortfolioRow)}
                                </tbody>
                            </Table>

                        </Card.Body>


                    </Card>
                </Col>


                <Col style={colStyle}  noGutters={true}>

                    <Card style={cardStyle}>
                        <Card.Header style={cardTitleStyle}>
                            Portfolio Growth
                                </Card.Header>
                        <Card.Body>
                            <AreaChart height={400} width={800} data={portfolioHistory} />
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row style={rowStyle} noGutters={true}>
                <Col style={colStyle}  md={3} noGutters={true}>
                    <Card style={cardStyle}>
                        <Card.Header style={cardTitleStyle}>Assets by Total Value</Card.Header>
                        <Card.Body >
                            <BarChart data={portfolioData} width={500} height={500} allowNegative={false} prefix={"$"} suffix={""} />
                        </Card.Body>
                    </Card>
                </Col>

                <Col style={colStyle}  md={3}   noGutters={true}>
                    <Card style={cardStyle}>
                        <Card.Header style={cardTitleStyle}>Market Capitalization </Card.Header>
                        <Card.Body>
                            {portfolioStatistics_mCapAggregate !== null ? <PieChart width={500} height={500} data={portfolioStatistics_mCapAggregate} /> : ''}
                        </Card.Body>
                    </Card >
                </Col>



            <Col style={colStyle}  md={3} noGutters={true}>
                    <Card style={cardStyle}>
                        <Card.Header style={cardTitleStyle}>Profit / Loss By Sector </Card.Header>
                        <Card.Body>
                            {portfolioStatistics_profitLoss !== null ? <BarChartNegative data={portfolioStatistics_profitLoss} allowNegative={true} width={500} height={500} prefix={""} suffix={"%"} /> : ""}
                        </Card.Body>
                    </Card >


                </Col>

                <Col style={colStyle}  md={3} noGutters={true}>
                    <Card style={cardStyle}>
                        <Card.Header style={cardTitleStyle}>
                            Top Gainers and Losers
        </Card.Header>
                        <Card.Body>
                            {portfolioData !== null ? <VerticalBarChartNegative width={300} height={500} suffix={"%"} data={gainersLosers(portfolioData)} /> : ''}

                        </Card.Body>
                    </Card>


                </Col>

            </Row>


            <Row style={rowStyle}  noGutters={true}>
                <Col style={rowStyle} noGutters={true}>
                    <Card style={cardStyle}>
                        <Card.Header style={cardTitleStyle}>
                            Sector Allocation Treemap
                                        </Card.Header>
                        <Card.Body>
                            {portfolioStatistics_sectorsTreeMap !== null ? <TreeMap width={1600} height={400} data={portfolioStatistics_sectorsTreeMap} /> : ''}

                        </Card.Body>
                    </Card>





                </Col>



            </Row>




        </Container>


    );
}

export { PortfolioPage };
