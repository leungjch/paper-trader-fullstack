import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';
import Tesla from './TSLA.js'
import cleanStockData from "../helper-functions/cleanStockData"
import StockQuote from "../components/StockQuote"
import { useNavigate, useLocation } from "react-router-dom";


function BuyPage() {

    const navigate = useNavigate();

    const [requestTicker, setRequestTicker] = useState("")
    const [numShares, setNumShares] = useState(1);
    const [stockData, setStockData] = useState({ empty: true })
    const [confirmButton, setConfirmButton] = useState(false)

    const { user } = useContext(UserContext);

    function getQuote() {
        if (requestTicker === "") {
            return
        }
        console.log("User request is", `/api/yfinance/${requestTicker}/info`)
        fetch(`/api/yfinance/${requestTicker}/info`)
            .then((response) => response.json())
            .then((data) => {

                console.log("Client: Received stock data", data);

                // If returned object is empty
                if (data['empty']) {
                    alert("Invalid stock ticker")
                } else {

                    setStockData(cleanStockData(data));
                    console.log(cleanStockData(data))
                }
            }).catch((error) => {
                alert("Invalid stock ticker. Please try again.")

            })
        setConfirmButton(true)
        // console.log(cleanStockData(Tesla))
        // setStockData(cleanStockData(Tesla))
    }

    function buyShares() {
        // GET user funds from DB
        fetch(`/api/users/${user.name}`)
            .then((response) => response.json())
            .then((data) => {
                const userData = data[0]
                const cash = userData['cash']
                const price = stockData['price']
                console.log(data, cash, price)

                // If user does not have enough funds, throw error
                if (cash < numShares * price) {
                    alert("Insufficient funds")
                    // Else, enter into DB
                } else {
                    // Update History: 
                    // ADD new entry of trade
                    fetch('/api/history', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: user.id, ticker: stockData['ticker'], trade_type: "Buy", trade_n: numShares, price: price, date: new Date() })
                    })
                        .then(data => {
                            // Next, fetch portfolio data
                            return fetch(`/api/portfolio/${user.id}`);
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            // Loop through portfolio and check if stock already exists
                            let isNewEntry = true;
                            let oldStock = { n_holding: 0, price: 0, current_total: 0, buy_price: 0 };
                            data.forEach(function (value, index) {
                                if (value['ticker'] == stockData['ticker']) {
                                    console.log("Updating value", value)
                                    isNewEntry = false;
                                    oldStock = value

                                }
                            })
                            console.log("Isnewentry: ", isNewEntry)
                            if (isNewEntry) {

                                // Perform ADD into DB
                                fetch(`/api/portfolio/${user.id}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ user_id: user.id, ticker: stockData['ticker'], buy_price: price, n_holding: numShares, current_price: price, current_total: price * (numShares), sector: stockData['sector'], marketCap: stockData['marketCap'] })
                                })
                            } else {
                                let avgPrice = (parseFloat(oldStock['current_total']) + stockData['price'] * numShares) / (parseInt(oldStock['n_holding']) + numShares)
                                let newTotal = price * numShares + parseFloat(oldStock['current_total'])

                                console.log("UPDATNG", numShares + oldStock['n_holding'])
                                console.log("DUPATING", avgPrice)
                                // Perform UPDATE into portfolio DB
                                fetch(`/api/portfolio/${user.id}/${stockData['ticker']}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ n_holding: numShares + parseInt(oldStock['n_holding']), buy_price: avgPrice, current_price: price, current_total: newTotal, user_id: user.id, ticker: stockData['ticker'] })
                                })
                            }
                        });

                    // Update user cash
                    let subtractCash = - (numShares * price)
                    // Perform update into user DB
                    fetch(`/api/users/${user.id}/${subtractCash}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: user.id, cash: subtractCash })
                    });
                }
            }


            ).then(// Redirect back to portfolio
                navigate("/portfolio"))


    }

    return (
        <div className="DivBoxBig">
            <div>
                <h2> Buy Assets </h2>
            </div>

            <div>
                <Form style={{ marginTop: "1em" }}>
                    <Form.Group controlId="formBasicEmail">

                        {/* <Form.Label></Form.Label> */}

                        <Form.Control
                            type="text"
                            placeholder="Enter Ticker (FB, WMT, GOOG...)"
                            onChange={(e) => { setConfirmButton(false); setStockData({ empty: true }); setRequestTicker(e.target.value) }} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Button
                        variant="info"
                        // type="submit"
                        onClick={getQuote}>
                        Request Quote
                </Button>
                </Form>

                {stockData['empty'] ?
                    '' :
                    <div>
                        <Form style={{ marginTop: "1em" }}>
                            <Form.Group controlId="formBasicEmail">

                                <Form.Label>Buy shares</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Number of shares"
                                    value={numShares}
                                    onChange={(e) => {
                                        const re = /^[0-9\b]+$/;

                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            if (parseInt(e.target.value)>0) {
                                                setNumShares(parseInt(e.target.value))
                                                setConfirmButton(true)
                                            } else {
                                                setNumShares(parseInt(e.target.value))
                                                setConfirmButton(false)
    
                                            }
                                        }
                                        else {
                                            alert("Please enter a valid number.")
                                            setNumShares(1)
                                        }

                                    }

                                    } />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <ButtonGroup>
                                {confirmButton ?
                                    <Button
                                        variant="success"
                                        // type="success"
                                        onClick={buyShares}>
                                        Confirm Buy

                </Button>

                                    : ""
                                }
                            </ButtonGroup>
                        </Form>
                        <div style={{display:"flex", justifyContent:"center"}}> 
                        <StockQuote data={stockData} />

                        </div>

                    </div>
                }

            </div>
        </div>
    );
}

export { BuyPage }