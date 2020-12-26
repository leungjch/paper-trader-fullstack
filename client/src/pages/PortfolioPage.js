import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';

function PortfolioPage() {

    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")

    const [authenticated, setAuthenticated] = useState(false)
    const [portfolioData, setPortfolioData] = useState([])

    const { user } = useContext(UserContext);


    // Fetch portfolio data for user from DB
    function getPortfolio() {
        console.log("Portfolio request is", "/api/portfolio/" + userId)
        fetch('/api/portfolio/' + userId)
            .then((response) => response.json())
            .then((data) => {
                console.log("Client: Loaded portfolio data", data);
                console.log("User info is, ", user)
                setPortfolioData(data);
            })
    }

    function renderPortfolioRow(item, index) {
        return (
            <tr key={index}>
                <td>{item.ticker}</td>
                <td>{item.n_holding}</td>
                <td>${item.current_price}</td>
                <td>${item.current_total}</td>
            </tr>
        )
    }

    useEffect(() => {
        // Fetch portfolio data
        getPortfolio()
    }, []);

    return (
        <div>
            <h2> Your Portfolio </h2>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Number of shares</th>
                        <th>Current price</th>
                        <th>Total value</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolioData.map(renderPortfolioRow)}
                </tbody>
            </Table>
        </div>
    );
}

export { PortfolioPage };
