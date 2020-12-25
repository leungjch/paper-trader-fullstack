import React from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { LoginPage } from './pages/LoginPage.js'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/buy">Buy</Link>
            </li>
            <li>
              <Link to="/sell">Sell</Link>
            </li>
            <li>
              <Link to="/history">Transaction History</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/portfolio">
            <PortfolioPage />
          </Route>
          <Route path="/buy">
            <BuyPage />
          </Route>
          <Route path="/sell">
            <SellPage />
          </Route>
          <Route path="/history">
            <HistoryPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// function LoginPage() {
//   return <h2>Login</h2>;
// }

function PortfolioPage() {
  return <h2>Your Portfolio</h2>;
}

function BuyPage() {
  return <h2>Buy</h2>;
}

function SellPage() {
  return <h2>Sell</h2>;
}

function HistoryPage() {
  return <h2>Transaction History</h2>;
}
