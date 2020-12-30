
import React, { useState, useEffect, useContext } from "react";
import { Image, Button, ButtonGroup, Card } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';
import cleanStockData from "../helper-functions/cleanStockData"
import abbreviateNumber from "../helper-functions/abbreviateNumber"

function StockQuote(props) {
    const stockData = props.data
    return (

        <Card style={{ width: '80%'}}>
            <Card.Body>
                <div style={{display:"flex", justifyContent:"center"}}>
                <Card.Img variant="center" as={Image} style={{maxWidth:'10em', maxHeight:'10em'}} fluid={false} src={stockData['imgUrl']} />

                </div>
                <Card.Title style={{fontSize:"24px"}}>{stockData['ticker']} ({stockData['longName']})</Card.Title>

                <Card.Title style={{fontSize:"25px"}}>${stockData['price']} per share</Card.Title>
                <Card.Title style={{fontSize:"18px"}}>Sector: {stockData['sector']}</Card.Title> 
                {/* <Card.Subtitle>Analyst recommendation: {stockData.recommendation}</Card.Subtitle> */}
                <Card.Subtitle style={{fontSize:"18px"}}>Market Cap: ${abbreviateNumber(stockData.marketCap)}</Card.Subtitle>
                <Card.Text style={{marginTop:"12px"}}>
                    {stockData['description']}
                </Card.Text>


            </Card.Body>
        </Card>

    )
}   

export default StockQuote