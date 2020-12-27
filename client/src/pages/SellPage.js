import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';
import Tesla from './TSLA.js'
import cleanStockData from "../helper-functions/cleanStockData"
import { useNavigate, useLocation } from "react-router-dom";

function SellPage() {

    const [requestTicker, setRequestTicker] = useState("")
    const [numShares, setNumShares] = useState(0);
    const [stockData, setStockData] = useState({ empty: true })

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    
    function getQuote() {
        // console.log("User request is", "/api/search/" + requestTicker)
        // fetch('/api/search/' + requestTicker)
        //     .then((response) => response.json())
        //     .then((data) => {

        //         console.log("Client: Received stock data", data);

        //         // If returned object is empty
        //         if (data['empty']) {
        //             alert("Invalid stock ticker")
        //         } else {

        //             setStockData(cleanStockData(data));
        //             console.log(stockData)
        //         }
        //     })

            console.log(cleanStockData(Tesla))
            setStockData(cleanStockData(Tesla))
    
    }

    function sellShares() {
        // GET stock from DB
        // Check if it exists
        fetch(`/api/portfolio/${user.id}/${requestTicker}`)
            .then((response) => response.json())
            .then((data) => {

                const userData = data[0]
                console.log(data)

                // If stock not found, throw error
                if (data.length == 0) {
                    alert("Stock not in portfolio")

                    // Else user is selling more shares than they have, return error
                } else if (userData['n_holding'] < numShares) {
                    alert("Insufficient shares")

                    // Else, enter into DB
                } else {
                    const userData = data[0]
                    const price = stockData['price']['raw']

                    // Number of shares currently held
                    const nHolding = userData['n_holding'];

                    // Add to History: 
                    // ADD new entry of trade
                    fetch('/api/history', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: user.id, ticker: stockData['ticker'], trade_type: "Sell", trade_n: numShares, price: price, date: new Date() })
                    })

                    // Update portfolio standing
                    // Case 1: User is selling some (not all) of their shares
                    if (numShares < nHolding) {
                        // UPDATE entry to fewer shares
                        fetch(`/api/portfolio/${user.id}/${stockData['ticker']}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ user_id: user.id, ticker: stockData['ticker'], n_holding: nHolding - numShares, current_price: price, current_total: price * (nHolding - numShares) })
                        })

                        // Case 2: User is selling ALL of their shares
                    } else if (numShares == nHolding) {
                        // DELETE entry from portfolio (sell all)
                        fetch(`/api/portfolio/${user.id}/${requestTicker}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ n_holding: nHolding - numShares, current_price: price, current_total: price * (nHolding - numShares), user_id: user.id, ticker: stockData['ticker'] })
                        })

                    }
                    // Case 3: Unexpected behaviour (we already covered this case before)
                    else {
                        alert("Unexpected behaviour")
                    }

                    // Update user cash
                    // Add
                    let cashNew = numShares * price
                    // Perform update into user DB
                    fetch(`/api/users/${user.id}/${cashNew}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: user.id, cash: cashNew })
                    });
                }
            }

            ).then(// Redirect back to portfolio
                navigate("/portfolio"))



    }

    return (
        <div>
            <h2>Sell</h2>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    {/* <Form.Label></Form.Label> */}
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
                            onClick={sellShares}>
                            Sell
                </Button>
                    </ButtonGroup>
                </Form>

            }



        </div>
    );
}




export { SellPage }