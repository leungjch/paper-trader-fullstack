import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';

function BuyPage() {

    const [requestTicker, setRequestTicker] = useState("")

    // RapidAPI stock data format
    // Price:       data['price']['regularMarketPrice']
    // MCap:        data['price']['marketCap']
    // Sector:      data['summaryProfile']['sector']
    // Description: data['summaryProfile']['longBusinessSummary']
    //


    function getQuote() {
        console.log("User request is", "/api/search/" + requestTicker)
        fetch('/api/search/' + requestTicker)
        .then((response) => response.json())
        .then((data) => {
          console.log("Client: Received stock data", data);
        })
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

    </div>
    );
}

export { BuyPage }