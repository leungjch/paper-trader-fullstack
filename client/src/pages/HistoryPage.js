import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';

function HistoryPage() {

    const [historyData, setHistoryData] = useState([])
    const { user } = useContext(UserContext);

    // Fetch portfolio data for user from DB
    function getHistory() {
        console.log()
        console.log("History request is", "/api/history/" + user.id)
        fetch('/api/history/' + user.id)
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
                <td>{item.trade_type}</td>
                <td>{item.trade_n}</td>
                <td>${item.price}</td>
                <td>{item.date}</td>
            </tr>
        )
    }

    useEffect(() => {
        // Fetch portfolio data
        getHistory()
    }, []);

    return (
        <div className="DivBoxBig">
            <div>
                <h2> Transaction History </h2>
            </div>

            <div>

                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Action</th>
                            <th>Number of shares</th>
                            <th>Price</th>
                            <th>Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map(renderHistoryRow)}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export { HistoryPage };
