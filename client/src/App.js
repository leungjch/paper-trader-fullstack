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


  return (

    <UserProvider>
      <Router>
          <Navbar  bg="light" expand="lg" style={{ fontSize: "22px", marginBottom: "1em" }}>
            <Navbar.Brand style={{ fontSize: "30px" }}>Paper Trader</Navbar.Brand>

            <Nav fill variant="pills" defaultActiveKey="/" style={{paddingLeft:"30px", paddingRight:"30px" , borderColor:"black", border:"2px"}}>
              {/* <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>  */}
              <Nav.Link>
                <Link to="/portfolio">Dashboard</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/portfolioDetails">Portfolio</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/buy">Buy</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/sell">Sell</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/history">Transactions</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/networth">History</Link>
              </Nav.Link>

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

