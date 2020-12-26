import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';

function BuyPage() {

    const API_KEY = process.env.REACT_APP_STOCK_API_KEY;
    const [requestTicker, setRequestTicker] = useState("")

    function getQuote() {
        console.log("Ticker is", requestTicker, API_KEY)
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