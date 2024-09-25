import React from "react";
import { Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { UserBadge } from "./user/userbadge";
import { AuthContext } from "./auth/AuthContext";

const Navbar = () => {
  return (
    <nav
        id="mainNav"
        className="navbar navbar-expand-md sticky-top py-3 navbar-dark"
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span>OnPaper</span>
          </Link>
          
          
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
            <Link
              className="btn btn-primary shadow"
              role="button"
              to="/login"
            >
              Login
            </Link>
          </div>
      </nav>
  );
};

export default Navbar;
