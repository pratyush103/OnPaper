import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { AuthProvider } from "./auth/AuthContext";
import { UserBadge } from "./user/userbadge";
import { AuthContext } from "./auth/AuthContext";

const NavbarComponent = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          OnPaper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {userInfo ? (
              <UserBadge profilePicture={userInfo.profilePicture} fullName={userInfo.displayName} />
            ) : (
              <Button as={Link} to="/login" variant="primary" className="shadow">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;