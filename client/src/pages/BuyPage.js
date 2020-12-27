import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';
import Tesla from './TSLA.js'
import cleanStockData from "../helper-functions/cleanStockData"

function BuyPage() {

    const [requestTicker, setRequestTicker] = useState("")
    const [numShares, setNumShares] = useState(0);
    const [stockData, setStockData] = useState({ empty: true })

    const { user } = useContext(UserContext);

    function getQuote() {
        console.log("User request is", "/api/search/" + requestTicker)
        fetch('/api/search/' + requestTicker)
            .then((response) => response.json())
            .then((data) => {

                console.log("Client: Received stock data", data);

                // If returned object is empty
                if (data['empty']) {
                    alert("Invalid stock ticker")
                } else {

                    setStockData(cleanStockData(data));
                    console.log(stockData)
                }
            })
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
                const price = stockData['price']['raw']
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
                            let alreadyN = 0;
                            data.forEach(function (value, index) {
                                if (value['ticker'] == stockData['ticker']) {
                                    console.log("Updating value")
                                    isNewEntry = false;
                                    alreadyN = value['n_holding']
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
                                    body: JSON.stringify({ user_id: user.id, ticker: stockData['ticker'], n_holding: numShares, current_price: price, current_total: price * (numShares) })
                                })
                            } else {
                                // Perform UPDATE into portfolio DB
                                fetch(`/api/portfolio/${user.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ n_holding: numShares + alreadyN, current_price: price, current_total: price * (numShares + alreadyN), user_id: user.id, ticker: stockData['ticker'] })
                                })
                            }
                        });

                    // Update user cash
                    let cashRemaining = cash - numShares * price
                    // Perform update into user DB
                    fetch(`/api/users/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: user.id, cash: cashRemaining })
                    });
                }
            }

            ) }

    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Ticker (TSLA, WMT, GOOG...)"
                        onChange={(e) => setRequestTicker(e.target.value)} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <ButtonGroup>
                    <Button
                        variant="info"
                        // type="submit"
                        onClick={getQuote}>
                        Request Quote
                </Button>
                </ButtonGroup>
            </Form>


            { stockData['empty'] ?
                '' :
                // stockData['description']
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Buy shares</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Number of shares"
                            onChange={(e) => setNumShares(parseInt(e.target.value))} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <ButtonGroup>
                        <Button
                            variant="success"
                            // type="success"
                            onClick={buyShares}>
                            Buy
                </Button>
                    </ButtonGroup>
                </Form>


            }

        </div>
    );
}

export { BuyPage }