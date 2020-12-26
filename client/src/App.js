import React, { useContext } from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { UserContext, UserProvider } from './UserContext';

import { LoginPage } from './pages/LoginPage.js'
import { PortfolioPage } from './pages/PortfolioPage'

export default function App() {

  const { user } = useContext(UserContext);

  return (
    <UserProvider>
      <Router>
        <div>
          <nav>
            <ul>
              {/* <li>
              <Link to="/login">Login</Link>
            </li> */}
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

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>

  );
}

// function LoginPage() {
//   return <h2>Login</h2>;
// }

// function PortfolioPage() {
//   return <h2>Your Portfolio</h2>;
// }

function BuyPage() {
  return <h2>Buy</h2>;
}

function SellPage() {
  return <h2>Sell</h2>;
}

function HistoryPage() {
  return <h2>Transaction History</h2>;
}
