import React, { useContext } from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute'
import { UserContext, UserProvider } from './UserContext';

import { LoginPage } from './pages/LoginPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { HistoryPage } from './pages/HistoryPage'
import { BuyPage } from './pages/BuyPage'

import { useNavigate, useLocation } from "react-router-dom";


export default function App() {



  const { user } = useContext(UserContext);
  console.log("User auth from app.js", user)
  

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
            <PrivateRoute path={"/portfolio"} component={PortfolioPage} />
            <PrivateRoute path={"/buy"} component={BuyPage}  />
            <PrivateRoute path={"/sell"} component={SellPage}  />
            <PrivateRoute path={"/history"} component={HistoryPage} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>

  );
}

function SellPage() {
  return <h2>Sell</h2>;
}

