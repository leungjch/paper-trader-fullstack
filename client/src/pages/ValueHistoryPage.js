import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';

function ValueHistoryPage() {

    const [historyData, setHistoryData] = useState([])
    const { user } = useContext(UserContext);

    // Fetch portfolio data for user from DB
    function getHistory() {
        console.log()
        console.log("Portfolio value history request is", "/api/portfolioValueHistory/" + user.id)
        fetch('/api/portfolioValueHistory/' + user.id)
            .then((response) => response.json())
            .then((data) => {
                console.log("Client: Loaded history data", data);
                setHistoryData(data);
            })
    }

    function renderHistoryRow(item, index) {
        return (
          <tr key={index}>
            <td>{item.tstamp}</td>
            <td>{item.networth}</td>
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
                <h2> Net Worth History </h2>
            </div>

            <div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Total Portfolio Value</th>

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

export { ValueHistoryPage };
