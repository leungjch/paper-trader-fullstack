import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function PortfolioPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [authenticated, setAuthenticated] = useState(false)
    const [portfolio, setPortfolio] = useState([])


    // Fetch portfolio data for user from DB
    function getPortfolio() {
        console.log("User request is", "/api/portfolio/" + username)
        fetch('/api/portfolio/' + username)
            .then((response) => response.json())
            .then((data) => {
                console.log("Client: Loaded portfolio data", data);
                setPortfolio(data);
            })

    }


    useEffect(() => {
        // Fetch portfolio data
        getPortfolio()
    }, []);

    return (
        <h2> Your Portfolio </h2>
    );
}

export { PortfolioPage };
