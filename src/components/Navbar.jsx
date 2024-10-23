import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { AuthContext } from "./auth/AuthContext";
import { UserBadge } from "./user/UserBadge";
import TickerTapeWidget from "./TickerTapeWidget";
import StockSearch from "./SearchBar";

const NavbarComponent = () => {
  const { userInfo, authToken } = useContext(AuthContext);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/">
            OnPaper
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {authToken && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
              <Nav.Link as={Link} to="/trade/news">News</Nav.Link>
              <Nav.Link as={Link} to="/trade/Tradeview">TradeView</Nav.Link>
            </Nav>

            {authToken && <StockSearch />}

            <Nav className="ms-auto">
              {userInfo ? (
                <UserBadge
                  profilePicture={userInfo.profilePicture}
                  fullName={userInfo.displayName}
                />
              ) : (
                <Button as={Link} to="/login" variant="primary" className="shadow">
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <TickerTapeWidget />
    </div>
  );
};

export default NavbarComponent;