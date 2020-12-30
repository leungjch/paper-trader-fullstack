import React, { useContext } from "react";
import { Button, Form, Navbar, Nav } from 'react-bootstrap';
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
import { PortfolioDetailsPage } from './pages/PortfolioDetailsPage'

import { HistoryPage } from './pages/HistoryPage'
import { BuyPage } from './pages/BuyPage'
import { SellPage } from './pages/SellPage'
import { ValueHistoryPage } from './pages/ValueHistoryPage'

import { useNavigate, useLocation } from "react-router-dom";

import './App.css'

export default function App() {

  const { user } = useContext(UserContext);
  console.log("User auth from app.js", user)

  const navItemStyle  = {
    color: "#eeeeee"
  }
  return (

    <UserProvider>
      <Router>
          <Navbar bg="info" variant="dark" style={{ fontSize: "22px", marginBottom: "1em" }}>
            <Navbar.Brand style={{ fontSize: "30px" }}>Paper Trader</Navbar.Brand>

            <Nav variant="pills" defaultActiveKey="/" >
              <Nav.Item>
                <Nav.Link style={navItemStyle}>
                  <Link style={navItemStyle} to="/portfolio" className="nav-link">Dashboard</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link>
                <Link style={navItemStyle} to="/portfolioDetails" className="nav-link">Portfolio</Link>
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link>
                <Link style={navItemStyle} to="/buy" className="nav-link">Buy</Link>
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link>
                <Link style={navItemStyle} to="/sell" className="nav-link">Sell</Link>
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link>
                <Link style={navItemStyle} to="/history" className="nav-link">Transactions</Link>
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link>
                <Link style={navItemStyle} to="/networth" className="nav-link">Net Worth</Link>
              </Nav.Link>
              </Nav.Item>




            </Nav>
          </Navbar>
          <div style={{ margin: "0em" }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <PrivateRoute path={"/portfolio"} component={PortfolioPage} />
              <PrivateRoute path={"/portfolioDetails"} component={PortfolioDetailsPage} />

              <PrivateRoute path={"/buy"} component={BuyPage} />
              <PrivateRoute path={"/sell"} component={SellPage} />
              <PrivateRoute path={"/history"} component={HistoryPage} />
              <PrivateRoute path={"/networth"} component={ValueHistoryPage}/>
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </div>
      </Router>
    </UserProvider>


  );
}

