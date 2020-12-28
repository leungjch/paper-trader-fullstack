
import React, { useState, useEffect, useContext } from "react";
import { Image, Button, ButtonGroup, Card } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';
import cleanStockData from "../helper-functions/cleanStockData"
import abbreviateNumber from "../helper-functions/abbreviateNumber"

function StockQuote(props) {
    const stockData = props.data
    return (
        <Card style={{ width: '80%' }}>
            <Card.Body>
                <Card.Img variant="top" as={Image} style={{maxWidth:'5em', maxHeight:'5em'}} fluid={true} src={stockData['imgUrl']} />
                <Card.Title>{stockData['ticker']}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{stockData['longName']}</Card.Subtitle>

                <Card.Title>${stockData['price']}</Card.Title>
                {/* <Card.Subtitle>Analyst recommendation: {stockData.recommendation}</Card.Subtitle> */}
                <Card.Subtitle>Market capitalization: {abbreviateNumber(stockData.marketCap)}</Card.Subtitle>
                <Card.Text>
                    {stockData['description']}
                </Card.Text>
                <Card.Link href="#">{stockData['sector']}</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>

            </Card.Body>
        </Card>

    )
}   

export default StockQuote