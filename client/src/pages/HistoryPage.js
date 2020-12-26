import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';

function HistoryPage() {

    const [username, setUsername] = useState("")
    const [userId, setUserId] = useState("")

    const [authenticated, setAuthenticated] = useState(false)
    const [historyData, setHistoryData] = useState([])


    // Fetch portfolio data for user from DB
    function getHistory() {
        console.log("User request is", "/api/portfolio/" + username)
        fetch('/api/history/' + username)
            .then((response) => response.json())
            .then((data) => {
                console.log("Client: Loaded history data", data);
                setHistoryData(data);
            })
    }

    function renderHistoryRow(item, index) {
        return (
          <tr key={index}>
            <td>{item.ticker}</td>
            <td>{item.n_holding}</td>
            <td>{item.current_price}</td>
            <td>{item.current_total}</td>
          </tr>
        )
      }


    useEffect(() => {
        // Fetch portfolio data
        getHistory()
    }, []);



    return (
        <div>
            <h2> Transaction History </h2>

            <Table striped condensed hover>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Number of shares</th>
                        <th>Current price</th>
                        <th>Total value</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolioData.map(renderHistoryRow)}
                </tbody>
            </Table>
        </div>
    );
}

export { HistoryPage };
