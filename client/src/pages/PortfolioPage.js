import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";

const PortfolioPage = (props) => {
    

    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")

    const [authenticated, setAuthenticated] = useState(false)
    const [portfolioData, setPortfolioData] = useState([])

    const navigate = useNavigate();
    const {state} = useLocation();

    // Fetch portfolio data for user from DB
    function getPortfolio() {
        console.log("User request is", "/api/portfolio/" + username)
        fetch('/api/portfolio/' + username)
            .then((response) => response.json())
            .then((data) => {
                console.log("Client: Loaded portfolio data", data);
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

        console.log(props)
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
