import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { AuthContext } from "./auth/AuthContext";
import { UserBadge } from "./user/UserBadge";
import TickerTapeWidget from "./TickerTapeWidget";

const NavbarComponent = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <><Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          OnPaper
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {userInfo ? (
              <UserBadge
                profilePicture={userInfo.profilePicture}
                fullName={userInfo.fullName} />
            ) : (
              <Button as={Link} to="/login" variant="primary" className="shadow">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar><TickerTapeWidget /></>
  );
};

export default NavbarComponent;