import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';
import Tesla from './TSLA.js'
import cleanStockData from "../helper-functions/cleanStockData"

function BuyPage() {

    const [requestTicker, setRequestTicker] = useState("")
    const [stockData, setStockData] = useState({empty: true})

    const { user } = useContext(UserContext);

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
                        variant="primary"
                        // type="submit"
                        onClick={getQuote}>
                        Request Quote
                </Button>
                </ButtonGroup>
            </Form>

            { stockData['empty'] ? 
                '' : 
                stockData['description']
                }

        </div>
    );
}

export { BuyPage }